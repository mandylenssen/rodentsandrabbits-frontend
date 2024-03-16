import Button from "../button/Button.jsx";
import {useEffect, useState} from "react";
import {jwtDecode} from "jwt-decode";
import axios from "axios";
import Spinner from "../spinner/Spinner.jsx";
import "./LogbookLogCard.css";

function LogbookLogCard() {
    const [logbookId, setLogbookId] = useState(null);
    const [logbookEntries, setLogbookEntries] = useState({logs: []});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const jwtToken = localStorage.getItem("token");
    const [pets, setPets] = useState({});
    const [imageUrls, setImageUrls] = useState({});
    const [visibleEntries, setVisibleEntries] = useState([]);

    // Initialiseert het logboek door vermeldingen en gerelateerde gegevens op te halen
    useEffect(() => {
        async function initializeLogbook() {
            if (!jwtToken) return;
            setLoading(true);
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
        }

        initializeLogbook();
    }, [jwtToken]);

// Haalt het logboek ID op voor een gebruiker
    async function fetchLogbookIdForUser(username) {
        try {
            const {data} = await axios.get(`http://localhost:8080/logbooks/user/${username}/id`, {
                headers: {
                    "Authorization": `Bearer ${jwtToken}`,
                    "Content-Type": "application/json"
                }
            });
            setLogbookId(data);
            return data;
        } catch (error) {
            setError("Failed to fetch logbook ID");
            setLoading(false);
            throw error;
        }
    }

// Haalt logboekvermeldingen op voor een gebruiker en sorteert ze om de nieuwste eerst te tonen
    async function fetchLogbookEntries(username) {
        try {
            const response = await axios.get(`http://localhost:8080/logbooks/user/${username}`, {
                headers: {Authorization: `Bearer ${jwtToken}`}
            });
            if (response.data && Array.isArray(response.data.logs)) {
                const sortedLogs = response.data.logs.sort((a, b) => new Date(b.date) - new Date(a.date));
                setLogbookEntries({...response.data, logs: sortedLogs});
                setVisibleEntries(sortedLogs.slice(0, 3));
                const petIds = new Set(sortedLogs.flatMap(log => log.petsIds));
                await fetchPetDetails([...petIds]);
                sortedLogs.forEach(log => {
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
    }

    // Laadt meer logboekvermeldingen
    async function handleLoadMore() {
        setVisibleEntries(logbookEntries.logs.slice(0, visibleEntries.length + 3));
    }

// Haalt details op voor elk huisdier geassocieerd met logboek berichten
    async function fetchPetDetails(petIds) {
        try {
            console.log("Fetching details for pet IDs:", petIds);
            const petPromises = petIds.map(petId =>
                axios.get(`http://localhost:8080/pets/${petId}`, {
                    headers: {
                        "Authorization": `Bearer ${jwtToken}`,
                        "Content-Type": "application/json"
                    }
                }).then(response => ({id: petId, data: response.data}))
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
    }

// Haalt afbeeldingsgegevens op voor elke logboekvermelding
    async function fetchImageData(logbookId, logId) {
        try {
            const response = await axios.get(`http://localhost:8080/logbooks/${logbookId}/logs/${logId}/images`, {
                headers: {Authorization: `Bearer ${jwtToken}`},
                responseType: "blob"
            });
            const imageUrl = URL.createObjectURL(response.data);
            setImageUrls(prev => ({...prev, [logId]: imageUrl}));
        } catch (error) {
            console.error(`Error fetching image for log ${logId}:`, error);
        }
    }


    useEffect(() => {
        if (jwtToken) {
            const {sub: username} = jwtDecode(jwtToken);
            fetchLogbookIdForUser(username);
        }
    }, [jwtToken]);

    if (loading) return <Spinner/>;
    if (error) return <div>{error}</div>;


    return (
        <main className="logbook-card-inner-container">
            {visibleEntries && visibleEntries.length > 0 ? (
                <>
                    {visibleEntries.map((log) => (
                        <section key={log.id} className="logbook-card-wrapper">
                            <div className="logbook-name-date-label">
                                <p><b>{log.petsIds.map(petId => pets[petId]?.name || "Unknown Pet").join(", ")}</b></p>
                                <time dateTime={log.date}>{new Date(log.date).toLocaleDateString()}</time>
                            </div>
                            <div className="logbook-card-content">
                                <div className="logbook-image-wrapper">
                                    {imageUrls[log.id] &&
                                        <img className="logbook-image" src={imageUrls[log.id]} alt="Log"/>}</div>
                                <p>{log.entry}</p></div>
                            <article className="logbook-squiggle-image"></article>
                        </section>
                    ))}
                    {visibleEntries.length < logbookEntries?.logs.length && (
                        <Button color="quaternary" onClick={handleLoadMore}>Load More</Button>
                    )}
                </>
            ) : (
                <p>No logbook entries found.</p>
            )}
        </main>
    );

}

export default LogbookLogCard;
