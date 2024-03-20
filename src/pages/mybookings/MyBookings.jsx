import "./MyBookings.css";
import {useEffect, useState} from "react";
import axios from "axios";
import {jwtDecode} from "jwt-decode";
import {NavLink} from "react-router-dom";
import Button from "../../components/button/Button.jsx";
import {renderBookingTable} from "../../helpers/renderBookingTable.jsx";
import {FaAngleDown, FaAngleUp} from "react-icons/fa";

function MyBookings() {
    const jwtToken = localStorage.getItem("token");
    const [futureBookings, setFutureBookings] = useState([]);
    const [pastBookings, setPastBookings] = useState([]);
    const [showPastBookings, setShowPastBookings] = useState(false);

    useEffect(() => {
        if (!jwtToken) {
            return;
        }
        let decodedToken;
        try {
            decodedToken = jwtDecode(jwtToken);
        } catch (error) {
            return;
        }

       async function fetchBookings() {
            try {
                const username = decodedToken.sub;

                const response = await axios.get(`http://localhost:8080/bookings/user/${username}`, {
                    headers: {
                        Authorization: `Bearer ${jwtToken}`,
                        "Content-Type": "application/json"
                    }
                });

                const bookingsData = response.data;

                const now = new Date();
                const future = bookingsData.filter(booking => new Date(booking.endDate) >= now);
                const past = bookingsData.filter(booking => new Date(booking.endDate) < now);

                setFutureBookings(future);
                setPastBookings(past);

                if (bookingsData.length > 0) {
                    fetchPetDetails([...future, ...past]);
                }
            } catch (error) {
                console.error("Failed to fetch bookings:", error);
            }
        };

        fetchBookings();
    }, [jwtToken]);

    async function fetchPetDetails(bookingsData) {
        try {
            const petIDs = bookingsData.flatMap(booking =>
                Array.isArray(booking.petIds) ? booking.petIds : [booking.petId]
            );

            const petPromises = petIDs.map(petId =>
                axios.get(`http://localhost:8080/pets/${petId}`, {
                    headers: {
                        Authorization: `Bearer ${jwtToken}`,
                        "Content-Type": "application/json"
                    }
                }).catch(error => {
                    console.error(`Failed to fetch details for petId ${petId}:`, error);
                    return null; // Ensure failed requests don't stop the mapping
                })
            );

            const responses = await Promise.all(petPromises);
            const petsData = responses
                .filter(response => response !== null)
                .map(response => response.data);

            // Convert the array of pets into a map for easier access
            const petsMap = petsData.reduce((acc, pet) => ({
                ...acc,
                [pet.id]: pet
            }), {});

            // Associate pets with their bookings
            const updatedBookings = bookingsData.map(booking => {
                const associatedPets = (booking.petIds || []).map(petId => petsMap[petId]).filter(pet => pet !== undefined);
                return { ...booking, pets: associatedPets };
            });

            setFutureBookings(updatedBookings.filter(booking => new Date(booking.endDate) >= new Date()));
            setPastBookings(updatedBookings.filter(booking => new Date(booking.endDate) < new Date()));
        } catch (error) {
            console.error("An unexpected error occurred while fetching pet details:", error);
        }
    }


    const togglePastBookings = () => {
        setShowPastBookings(!showPastBookings);
    };


    return (
        <main className="mybooking-outer-container outer-container">
            <div className="mybooking-inner-container">
                <section className="mybooking-table-container">
                    {renderBookingTable(futureBookings, "My Bookings")}
                    <p>If you wish to make changes to your past bookings, please don't hesitate to contact us.</p>
                    {showPastBookings && (
                        <>
                            {showPastBookings && renderBookingTable(pastBookings, "Past Bookings")}

                        </>
                    )}
                    <p className={`show-past-bookings-text ${showPastBookings ? 'hidden' : ''}`} onClick={togglePastBookings}>
                        {showPastBookings ? <FaAngleUp /> : <FaAngleDown />} {showPastBookings ? "Hide Past Bookings" : "Show Past Bookings"}
                    </p>
                    <NavLink to="/bookings">
                        <Button type="button" color="quaternary">New Booking</Button>
                    </NavLink>
                </section>
            </div>
        </main>
    );
}

export default MyBookings;
