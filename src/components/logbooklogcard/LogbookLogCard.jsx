import './LogbookLogCard.css';
import React, {useEffect, useState} from "react";
import {jwtDecode} from "jwt-decode";
import axios from "axios";
import Button from "../button/Button.jsx";

function LogbookLogCard() {
    const [logbookId, setLogbookId] = useState(null);
    const [logbookEntries, setLogbookEntries] = useState({ logs: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const jwtToken = localStorage.getItem("token");
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
                    "Authorization": `Bearer ${jwtToken}`,
                    "Content-Type": "application/json"
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
            console.log("Fetched logbook entries:", response.data);
            if (response.data && Array.isArray(response.data.logs)) {
                setLogbookEntries(response.data);
                setVisibleEntries(response.data.logs.slice(0, 3));
                const petIds = new Set(response.data.logs.flatMap(log => log.petsIds));
                fetchPetDetails([...petIds]);
                response.data.logs.forEach(log => {
                    fetchImageData(log.logbookId, log.id);
                });
            } else {
                console.error("Unexpected response structure:", response.data);
                setError("Unexpected data structure received");
            }
        } catch (error) {
            console.error("Error fetching logbook data:", error);
            setError("Failed to fetch logbook data");
        }
    };

    const handleLoadMore = () => {
        setVisibleEntries(logbookEntries.logs.slice(0, visibleEntries.length + 3));
    };
    const fetchPetDetails = async (petIds) => {
        try {
            console.log("Fetching details for pet IDs:", petIds);
            const petPromises = petIds.map(petId =>
                axios.get(`http://localhost:8080/pets/${petId}`, {
                    headers: {
                        "Authorization": `Bearer ${jwtToken}`,
                        "Content-Type": "application/json"
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
            console.error("Failed to fetch pet details:", error);
        }
    };



    const fetchImageData = async (logbookId, logId) => {
        try {
            const response = await axios.get(`http://localhost:8080/logbooks/${logbookId}/logs/${logId}/images`, {
                headers: { Authorization: `Bearer ${jwtToken}` },
                responseType: "blob"
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
        <div className="logbooklog-card-inner-container">
            {visibleEntries && visibleEntries.length > 0 ? (
                <>
                    {visibleEntries.map((log, index) => (
                        <div className="logbooklog-wrapper" key={index}>
                            <div className="logbooklog-label-image-wrapper">
                                <div className="name-date-label">
                                    <p><b>{log.petsIds.map(petId => pets[petId]?.name || "Unknown Pet").join(", ")}</b></p>
                                    <p>{new Date(log.date).toLocaleDateString()}</p>
                                </div>
                                <div className="logbook-image-wrapper">
                                    {imageUrls[log.id] && <img className="logbook-image" src={imageUrls[log.id]} alt="Log" />}
                                </div>
                            </div>
                            <p>{log.entry}</p>
                            <div className="logbook-squiggle-image"></div>
                        </div>
                    ))}
                    {visibleEntries.length < logbookEntries.logs.length && (
                        <Button color="quaternary" onClick={handleLoadMore}>Load More</Button>
                    )}
                </>
            ) : (
                <p>No logbook entries found.</p>
            )}
        </div>
    );

}
export default LogbookLogCard;