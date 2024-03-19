import React, {useState, useEffect} from "react";
import axios from "axios";
import Button from "../../components/button/Button.jsx";
import "./BookingManager.css";
import Spinner from "../../components/spinner/Spinner.jsx";

function BookingManager() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pets, setPets] = useState({});
    const [error, setError] = useState("");

    useEffect(() => {
        fetchBookingsAndPets();
    }, []);

    // haal alle bookings op en filter de bookings die in de toekomst liggen
    async function fetchBookingsAndPets() {
        setLoading(true);
        setError("")
        try {
            const bookingsRes = await axios.get("http://localhost:8080/bookings", {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                },
            });

            const currentAndUpcomingBookings = bookingsRes.data.filter(booking => {
                const bookingEndDate = new Date(booking.endDate);
                return bookingEndDate >= new Date();
            });

            setBookings(currentAndUpcomingBookings);

            const petIds = currentAndUpcomingBookings.map(booking => booking.petIds).flat();
            await fetchPetDetails(petIds);
        } catch (err) {
            setError("Failed to fetch bookings or pet details.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    // haal de details van de pets op
    async function fetchPetDetails(petIds) {
        const uniquePetIds = [...new Set(petIds)];
        try {
            const petDetailsResponses = await Promise.all(uniquePetIds.map(petId =>
                axios.get(`http://localhost:8080/pets/${petId}`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`,
                        "Content-Type": "application/json",
                    },
                }).catch(error => {
                    console.error(`Failed to fetch details for pet ${petId}`, error);
                    return null;
                })
            ));
            const newPets = petDetailsResponses.reduce((acc, response) => {
                if (response && response.data) acc[response.data.id] = response.data;
                return acc;
            }, {});

            setPets(prevPets => ({...prevPets, ...newPets}));
        } catch (error) {
            console.error("Failed to fetch pet details", error);
        }
    }

    // bevestig de booking
    async function confirmBooking(bookingId) {
        try {
            const bookingToConfirm = bookings.find(booking => booking.id === bookingId);
            if (!bookingToConfirm) {
                console.error(`Booking with ID ${bookingId} not found.`);
                return;
            }
            const updatedBooking = {
                ...bookingToConfirm,
                isConfirmed: true
            };
            await axios.put(`http://localhost:8080/bookings`, updatedBooking, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                },
            });

            const updatedBookings = bookings.map(booking =>
                booking.id === bookingId ? {...booking, isConfirmed: true} : booking
            );
            setBookings(updatedBookings);
        } catch (err) {
            console.error("Failed to confirm booking", err);
            setError(`Failed to confirm booking: ${err.message}`);
        }
    }

    if (loading) return <Spinner/>;
    if (error) return <div>{error}</div>;

    return (
        <main className="bookingmanager-outer-container outer-container">
            <section className="bookingmanager-inner-container inner-container">
                <h1>Current & Upcoming Bookings</h1>
                {bookings.length > 0 ? (
                    <table>
                        <thead>
                        <tr>
                            <th>Booking id</th>
                            <th>Pets</th>
                            <th>Start date</th>
                            <th>End date</th>
                            <th>Additional Info</th>
                            <th>Confirmed</th>
                        </tr>
                        </thead>
                        <tbody>
                        {bookings.map((booking) => (
                            <tr key={booking.id}>
                                <td>{booking.id}</td>
                                <td>{booking.petIds.map(petId => pets[petId]?.name || "Unknown Pet").join(", ")}</td>
                                <td>{new Date(booking.startDate).toLocaleDateString()}</td>
                                <td>{new Date(booking.endDate).toLocaleDateString()}</td>
                                <td>{booking.additionalInfo || "N/A"}</td>
                                <td>
                                    {booking.isConfirmed ?
                                        "Confirmed" :
                                        <Button color="secondary" type="submit"
                                                onClick={() => confirmBooking(booking.id)}>Confirm</Button>
                                    }
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No current or upcoming bookings.</p>
                )}
            </section>
        </main>
    );
}

export default BookingManager;
