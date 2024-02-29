import { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import {fetchLogbookEntries} from "./useFetchLogbookEntries.jsx";

export const useFetchLogbookID = (jwtToken) => {
    const [logbookId, setLogbookId] = useState(null);
    const [logbookEntries, setLogbookEntries] = useState({ logs: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!jwtToken) {
            setLoading(false);
            return;
        }

        const fetchLogbookIdForUser = async () => {
            try {
                const { sub: username } = jwtDecode(jwtToken);
                const { data } = await axios.get(`http://localhost:8080/logbooks/user/${username}/id`, {
                    headers: { "Authorization": `Bearer ${jwtToken}`, "Content-Type": "application/json" }
                });
                setLogbookId(data);
                await fetchLogbookEntries(username, jwtToken, setLogbookEntries, setError);
            } catch (error) {
                setError("Failed to fetch logbook ID");
                console.error("Failed to fetch logbook ID:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchLogbookIdForUser();
    }, [jwtToken]);

    return { logbookId, logbookEntries, loading, error };
};
