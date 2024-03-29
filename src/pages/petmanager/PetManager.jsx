import React, { useState, useEffect } from "react";
import axios from "axios";
import "./PetManager.css";
import Button from "../../components/button/Button.jsx";
import PetRow from "../../components/petrow/PetRow.jsx";
import Spinner from "../../components/spinner/Spinner.jsx";

function PetManager() {
    const [petsWithBookings, setPetsWithBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const currentDate = new Date();
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    const formattedDate = currentDate.toLocaleDateString('en-US', options);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const pageSize = 10;

    useEffect(() => {
        async function fetchPetsAndBookings() {
            setLoading(true);
            setError("");
            try {
                const petsRes = await axios.get('http://localhost:8080/pets', {
                    headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
                });
                const bookingsRes = await axios.get('http://localhost:8080/bookings', {
                    headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
                });

                const currentDate = new Date();
                currentDate.setHours(0, 0, 0, 0);

                const petsData = petsRes.data;
                const bookingsData = bookingsRes.data;

                const combinedAndFilteredData = petsData.map(pet => {
                    const petBookings = bookingsData.filter(booking =>
                        booking.petIds.includes(pet.id) &&
                        new Date(booking.startDate) <= currentDate &&
                        new Date(booking.endDate) >= currentDate
                    );

                    const currentBooking = petBookings.length > 0 ? petBookings[0] : null;

                    return currentBooking ? {
                        ...pet,
                        startDate: currentBooking.startDate,
                        endDate: currentBooking.endDate,
                    } : null;
                }).filter(pet => pet !== null);
                setTotalPages(Math.ceil(combinedAndFilteredData.length / pageSize));
                const paginatedData = combinedAndFilteredData.slice((currentPage - 1)  * pageSize, currentPage * pageSize);
                setPetsWithBookings(paginatedData);
            } catch (error) {
                console.error('Failed to fetch data:', error);
                setError('Failed to fetch data');
            } finally {
                setLoading(false);
            }
        }

        fetchPetsAndBookings();
    }, [currentPage]);


    if (loading) return <Spinner/>;
    if (error) return <div>{error}</div>;

    const printToDos = () => window.print();

    return (
        <main className="petmanager-outer-container outer-container pet-manager">
            <section className="inner-container">
                <h1>Pet Manager</h1>
                <p>All pets currently staying at Rodents & Rabbits on {formattedDate}</p>
                <table className="pet-manager-table">
                    <thead>
                    <tr>
                        <th>Pet</th>
                        <th>Picture</th>
                        <th>Staying time</th>
                        <th>Age</th>
                        <th>Species</th>
                        <th>Gender</th>

                        <th>Medication</th>
                        <th>Food</th>
                        <th>Notes</th>
                        <th>Done</th>
                    </tr>
                    </thead>
                    <tbody>
                    {petsWithBookings.map(pet => (
                        <PetRow
                            key={pet.id}
                            pet={pet}
                            startDate={pet.startDate}
                            endDate={pet.endDate}
                        />
                    ))}
                    </tbody>
                </table>
                <div className="pagination-controls">
                    <Button
                        disabled={currentPage <= 1}
                        onClick={() => setCurrentPage(prev => prev > 1 ? prev - 1 : prev)}
                    >
                        Previous
                    </Button>
                    <span>Page {currentPage} of {totalPages}</span>
                    <Button
                        disabled={currentPage >= totalPages}
                        onClick={() => setCurrentPage(prev => prev < totalPages ? prev + 1 : prev)}
                    >
                        Next
                    </Button>
                </div>


                <div className="print-button">
                    <Button color="secondary" type="submit" onClick={printToDos}>Print to do list</Button>
                </div>
            </section>
        </main>
    );
}

export default PetManager;
