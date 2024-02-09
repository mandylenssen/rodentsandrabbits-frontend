import './MyBookings.css'
import {useEffect, useState} from "react";
import axios from "axios";

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

                const currentDateTime = new Date();
                const futureBookings = bookingsData.filter(booking => {
                    const bookingEndDate = new Date(booking.endDate);
                    return bookingEndDate >= currentDateTime;
                });

                setBookings(futureBookings);
                console.log(futureBookings)

                fetchPetDetails(futureBookings)
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
                {bookings.length > 0 ? (
                    <table>
                        <thead>
                        <tr>
                            <th>Pet</th>
                            <th>Start date</th>
                            <th>End date</th>
                            {/*<th>Additional Info</th>*/}
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
                                    {/*<td>{booking.additionalInfo || 'N/A'}</td>*/}
                                    <td>{booking.confirmed ? 'Yes' : 'No'}</td>
                                </tr>
                            ))
                        )}
                        </tbody>
                    </table>
                ) : (
                    <p>No bookings found.</p>
                )}




            <p>If you wish to make changes to your bookings, please don't hesitate to contact us. Our team is here to
                assist you with any modifications or inquiries you may have. Thank you for choosing our services!
            </p>
            </div></div>
        </>
    )
}

export default MyBookings;
