import './MyBookings.css'
import {useEffect, useState} from "react";
import axios from "axios";
import * as pet from "date-fns/locale";

function MyBookings() {

    const [pets, setPets] = useState([]);
    const [bookings, setBookings] = useState([]);
    const jwtToken = localStorage.getItem('token');

    useEffect(() => {


        const fetchBookings = async () => {
            try {
                const response = await axios.get('http://localhost:8080/bookings/user', {
                    headers: {
                        'Authorization': `Bearer ${jwtToken}`,
                        'Content-Type': 'application/json'
                    }
                });
                const bookingsData = response.data;
                setBookings(bookingsData);
                console.log(bookingsData)
                fetchPetDetails(bookingsData)
            } catch (error) {
                console.error('Failed to fetch bookings:', error);

            }
        };

        fetchBookings();
    }, []);

    const fetchPetDetails = async (bookingsData) => {
        try {
            const petIDs = bookingsData.flatMap(booking => Array.isArray(booking.petIds) ? booking.petIds : [booking.petId]);
            const petPromises = petIDs.map(async petId => {
                const response = await axios.get(`http://localhost:8080/pets/${petId}`, {
                    headers: {
                        'Authorization': `Bearer ${jwtToken}`,
                        'Content-Type': 'application/json'
                    }
                });
                return response.data;
            });

            const petsData = await Promise.all(petPromises);

            const petsMap = petsData.reduce((acc, pet) => ({ ...acc, [pet.id]: pet }), {});
            setPets(petsMap);
        } catch (error) {
            console.error('Failed to fetch pet details:', error);
        }
    };



    return (
        <>
            <div className="outer-mybookings-container outer-container">
            <div className="inner-container">
            <h3>My bookings</h3>

                {bookings.length > 0 ? bookings.map((booking, index) => (
                    <div key={index}>
                        <p>Pet(s)</p>
                        <ul>
                            {booking.petIds.map(petId => (
                                <li key={petId}>{pets[petId] ? pets[petId].name : "Unknown Pet"}</li>
                            ))}
                        </ul>
                       <p>Start date: {new Date(booking.startDate).toLocaleDateString()}</p>
                        <p>End date: {new Date(booking.endDate).toLocaleDateString()}</p>
                        {bookings.map(booking => (
                            <div key={booking.id}>


                            </div>
                        ))}


                        <p>Additional info: {booking.additionalInfo}</p>
                    </div>
                )) : <p>No bookings found.</p>}
            <p>If you wish to make changes to your bookings, please don't hesitate to contact us. Our team is here to
                assist you with any modifications or inquiries you may have. Thank you for choosing our services!
            </p>
            </div></div>
        </>
    )
}

export default MyBookings;
