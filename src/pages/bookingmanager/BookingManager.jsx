import "./BookingManager.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "../../components/button/Button.jsx";

function BookingManager() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pets, setPets] = useState({});
    const [error, setError] = useState("");

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const response = await axios.get("http://localhost:8080/bookings", {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                },
            });
            const currentDateTime = new Date();
            const currentAndUpcomingBookings = response.data.filter(booking => {
                const bookingEndDate = new Date(booking.endDate);
                return bookingEndDate >= currentDateTime;
            });
            setBookings(currentAndUpcomingBookings);
            fetchPetDetails(currentAndUpcomingBookings.map(booking => booking.petIds).flat());
            setLoading(false);
        } catch (err) {
            setError("Failed to fetch bookings");
            setLoading(false);
            console.error(err);
        }
    };

    const fetchPetDetails = async (petIds) => {
        const uniquePetIds = Array.from(new Set(petIds));
        const petDetails = {};

        await Promise.all(uniquePetIds.map(async (petId) => {
            try {
                const response = await axios.get(`http://localhost:8080/pets/${petId}`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`,
                        "Content-Type": "application/json",
                    },
                });
                petDetails[petId] = response.data;
            } catch (error) {
                console.error(`Failed to fetch details for pet ${petId}`, error);
            }
        }));

        setPets(petDetails);
    };

    const confirmBooking = async (bookingId) => {
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
                booking.id === bookingId ? { ...booking, isConfirmed: true } : booking
            );
            setBookings(updatedBookings);
            console.log("Booking confirmed:", bookingId);
        } catch (err) {
            console.error("Failed to confirm booking", err);
            setError(`Failed to confirm booking: ${err.message}`);
        }
    };

    if (loading) return <div>Loading bookings...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="bookingmanager-outer-container outer-container">
            <div className="bookingmanager-inner-container inner-container">
            <h3>Current & Upcoming Bookings</h3>
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
                                    <Button color="tertiary" type="submit" onClick={() => confirmBooking(booking.id)}>Confirm</Button>
                                }
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            ) : (
                <p>No current or upcoming bookings.</p>
            )}
        </div>
        </div>
    );
}

export default BookingManager;
