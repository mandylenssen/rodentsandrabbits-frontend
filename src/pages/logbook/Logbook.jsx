import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {jwtDecode} from "jwt-decode";
import './Logbook.css';

function Logbook() {
    const [logbookId, setLogbookId] = useState(null);
    const [logbookEntries, setLogbookEntries] = useState({ logs: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const jwtToken = localStorage.getItem('token');
    const [pets, setPets] = useState({});
    const [imageUrls, setImageUrls] = useState({});


    useEffect(() => {
        const initializeLogbook = async () => {
            if (!jwtToken) return;
            try {
                const decodedToken = jwtDecode(jwtToken);
                const username = decodedToken.sub;
                await fetchLogbookEntries(username);
            } catch (error) {
                console.error("Error initializing logbook:", error);
                setError("Failed to initialize logbook");
            } finally {
                setLoading(false);
            }
        };

        initializeLogbook();
    }, [jwtToken]);


    async function fetchLogbookIdForUser(username) {
        try {
            const { data } = await axios.get(`http://localhost:8080/logbooks/user/${username}/id`, {
                headers: {
                    'Authorization': `Bearer ${jwtToken}`,
                    'Content-Type': 'application/json'
                }
            });
            setLogbookId(data);
            return data;
        } catch (error) {
            console.error("Failed to fetch logbook ID:", error);
            setError("Failed to fetch logbook ID");
            setLoading(false);
            throw error;
        }
    }

    const fetchLogbookEntries = async (username) => {
        try {
            const response = await axios.get(`http://localhost:8080/logbooks/user/${username}`, {
                headers: { Authorization: `Bearer ${jwtToken}` }
            });
            console.log('Fetched logbook entries:', response.data);
            if (response.data && Array.isArray(response.data.logs)) {
                setLogbookEntries(response.data);
                const petIds = new Set(response.data.logs.flatMap(log => log.petsIds));
                fetchPetDetails([...petIds]);
                console.log('Fetching image for log:', response.data.logs)
                response.data.logs.forEach(log => {
                    fetchImageData(log.logbookId, log.id);


                });
            } else {
                console.error('Unexpected response structure:', response.data);
                setError('Unexpected data structure received');
            }
        } catch (error) {
            console.error("Error fetching logbook data:", error);
            setError("Failed to fetch logbook data");
        }
    };


    const fetchPetDetails = async (petIds) => {
        try {
            console.log('Fetching details for pet IDs:', petIds);
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

            const petsMap = responses.reduce((acc, {id, data}) => {
                acc[id] = data;
                return acc;
            }, {});
            setPets(petsMap);
        } catch (error) {
            console.error('Failed to fetch pet details:', error);
        }
    };



    const fetchImageData = async (logbookId, logId) => {
        try {
            const response = await axios.get(`http://localhost:8080/logbooks/${logbookId}/logs/${logId}/images`, {
                headers: { Authorization: `Bearer ${jwtToken}` },
                responseType: 'blob'
            });
            const imageUrl = URL.createObjectURL(response.data);
            setImageUrls(prev => ({ ...prev, [logId]: imageUrl }));
        } catch (error) {
            console.error(`Error fetching image for log ${logId}:`, error);
        }
    };


    useEffect(() => {
        if (jwtToken) {
            const { sub: username } = jwtDecode(jwtToken);
            fetchLogbookIdForUser(username);
        }
    }, [jwtToken]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;







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
                                {imageUrls[log.id] && <img src={imageUrls[log.id]} alt="Log" />}
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
