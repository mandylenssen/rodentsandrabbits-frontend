import "./MyBookings.css";
import {useEffect, useState} from "react";
import axios from "axios";
import {jwtDecode} from "jwt-decode";
import {NavLink} from "react-router-dom";
import Button from "../../components/button/Button.jsx";

function MyBookings() {
    const [pets, setPets] = useState({});
    const [bookings, setBookings] = useState([]);
    const jwtToken = localStorage.getItem("token");

    let decodedToken;
    if (jwtToken) {
        try {
            decodedToken = jwtDecode(jwtToken);
            console.log("Decoded Token:", decodedToken);
        } catch (error) {
            console.error("Error decoding token:", error);
        }
    } else {
        console.log("No JWT Token found.");
    }

    useEffect(() => {
        if (jwtToken && decodedToken) {
            fetchBookings();
        }
    }, [jwtToken]);

    const fetchBookings = async () => {
        try {
            const username = decodedToken.sub;

            const response = await axios.get(`http://localhost:8080/bookings/user/${username}`, {
                headers: {
                    "Authorization": `Bearer ${jwtToken}`,
                    "Content-Type": "application/json"
                }
            });

            const bookingsData = response.data;
            console.log(bookingsData);
            const currentDateTime = new Date();
            const futureBookings = bookingsData.filter(booking => {
                const bookingEndDate = new Date(booking.endDate);
                return bookingEndDate >= currentDateTime;
            });

            setBookings(futureBookings);
            console.log(futureBookings);

            if (futureBookings.length > 0) {
                fetchPetDetails(futureBookings);
            }
        } catch (error) {
            console.error("Failed to fetch bookings:", error);
        }
    };

    const fetchPetDetails = async (bookingsData) => {
        try {
            const petIDs = bookingsData.flatMap(booking => Array.isArray(booking.petIds) ? booking.petIds : [booking.petId]);
            const petPromises = petIDs.map(petId => axios.get(`http://localhost:8080/pets/${petId}`, {
                headers: {
                    "Authorization": `Bearer ${jwtToken}`,
                    "Content-Type": "application/json"
                }
            }));

            const responses = await Promise.all(petPromises);
            const petsData = responses.map(response => response.data);

            const petsMap = petsData.reduce((acc, pet) => ({...acc, [pet.id]: pet}), {});
            setPets(petsMap);
        } catch (error) {
            console.error("Failed to fetch pet details:", error);
        }
    };

    return (
        <>
            <div className="mybooking-outer-container outer-container">
                <div className="mybooking-inner-container">
                    <div className="mybooking-table-container">


                        {bookings.length > 0 ? (
                            <div className="table-wrapper">
                                <h3>My bookings</h3>
                                <table>
                                    <thead>
                                    <tr>
                                        <th>Pet</th>
                                        <th>Start date</th>
                                        <th>End date</th>
                                        <th>Confirmed</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {bookings.map((booking, bookingIndex) =>
                                        booking.petIds.map((petId, petIndex) => (
                                            <tr key={`${bookingIndex}-${petId}`}>
                                                <td>{pets[petId] ? pets[petId].name : "Unknown Pet"}</td>
                                                <td>{new Date(booking.startDate).toLocaleDateString()}</td>
                                                <td>{new Date(booking.endDate).toLocaleDateString()}</td>
                                                <td>{booking.isConfirmed ? "Yes" : "No"}</td>
                                            </tr>
                                        ))
                                    )}
                                    </tbody>
                                </table>

                                <p>If you wish to make changes to your bookings, please don't hesitate to contact
                                    us.</p>
                                <NavLink to="/bookings">
                                    <Button type="button" color="quaternary">New Booking</Button>
                                </NavLink>
                            </div>
                        ) : (
                            <div>
                            <p>No bookings found.</p>
                            <NavLink to="/bookings">
                            <Button type="button" color="quaternary">New Booking</Button>
                            </NavLink></div>
                        )}

                    </div>
                </div>
            </div>
        </>
    );
}

export default MyBookings;
