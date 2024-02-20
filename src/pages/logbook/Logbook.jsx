import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {jwtDecode} from "jwt-decode";
import './Logbook.css';

function Logbook() {
    const [logbookEntries, setLogbookEntries] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const jwtToken = localStorage.getItem('token');
    const [pets, setPets] = useState({});

    useEffect(() => {
        if (jwtToken) {
            const decodedToken = jwtDecode(jwtToken);
            const username = decodedToken.sub;
            fetchLogbookForUser(username);
            console.log("Decoded Token:", decodedToken.sub);
        }
    }, [jwtToken]);

    const fetchLogbookForUser = async (username) => {
        try {
            const response = await axios.get(`http://localhost:8080/logbooks/user/${username}`, {
                headers: {
                    'Authorization': `Bearer ${jwtToken}`,
                    'Content-Type': 'application/json'
                }
            });
            console.log("Logbook entries:", response.data);
            setLogbookEntries(response.data);
            const petIds = response.data.logs.flatMap(log => log.petsIds).flat().filter(id => id !== undefined);

            fetchPetDetails(petIds); // Call fetchPetDetails here with the correct pet IDs
            setLoading(false);
        } catch (error) {
            console.error("Failed to fetch logbook entries:", error);
            setError("Failed to fetch logbook entries");
            setLoading(false);
        }
    };


    const fetchPetDetails = async (petIds) => {
        try {
            console.log('Fetching details for pet IDs:', petIds); // Log the pet IDs being requested
            const petPromises = petIds.map(petId =>
                axios.get(`http://localhost:8080/pets/${petId}`, {
                    headers: {
                        'Authorization': `Bearer ${jwtToken}`,
                        'Content-Type': 'application/json'
                    }
                }).then(response => ({ id: petId, data: response.data }))
                    .catch(error => console.log(`Error fetching details for pet ID ${petId}:`, error))
            );
            const responses = await Promise.all(petPromises);
            console.log('Pet details responses:', responses); // Log the responses

            const petsMap = responses.reduce((acc, {id, data}) => {
                acc[id] = data;
                return acc;
            }, {});
            setPets(petsMap);
        } catch (error) {
            console.error('Failed to fetch pet details:', error);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;



    return (
        <>
            <div className="logbook-outer-container outer-container">
                <div className="inner-container">
                    <h3>Logbook</h3>
                    {logbookEntries && logbookEntries.logs.length > 0 ? (
                        logbookEntries.logs.map((log) => (
                            <div key={log.id}>
                                <h4>Date: {new Date(log.date).toLocaleDateString()}</h4>
                                <h4>Pets: {log.petsIds.map(petId => pets[petId]?.name || "Unknown Pet").join(", ")}</h4>
                                <p>Entry: {log.entry}</p>

                            </div>
                        ))
                    ) : (
                        <p>No logbook entries found.</p>
                    )}
            </div>
            </div>
        </>
    );
}

export default Logbook;
