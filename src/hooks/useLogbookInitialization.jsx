import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import {fetchLogbookEntries} from "./useFetchLogbookEntries.jsx";

export const useLogbookInitialization = (jwtToken) => {
    const [logbookEntries, setLogbookEntries] = useState({ logs: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const initializeLogbook = async () => {
            if (!jwtToken) return;
            try {
                const decodedToken = jwtDecode(jwtToken);
                const username = decodedToken.sub;
                await fetchLogbookEntries(username, jwtToken, setLogbookEntries, setError);
            } catch (error) {
                console.error('Error initializing logbook:', error);
                setError('Failed to initialize logbook');
            } finally {
                setLoading(false);
            }
        };

        initializeLogbook();
    }, [jwtToken]);

    return { logbookEntries, loading, error };
};
