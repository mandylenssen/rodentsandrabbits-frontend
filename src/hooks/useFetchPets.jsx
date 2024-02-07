import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchPets = (jwtToken, updateTrigger) => {
    const [pets, setPets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        const fetchPets = async () => {
            try {
                const response = await axios.get('http://localhost:8080/pets/user', {
                    headers: {
                        'Authorization': `Bearer ${jwtToken}`,
                        'Content-Type': 'application/json'
                    },
                    signal: signal,
                });
                setPets(response.data);
            } catch (error) {
                if (axios.isCancel(error)) {
                    console.log('Request canceled', error.message);
                } else {
                    setError('Failed to load pets. Please try again later.');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchPets();

        return () => controller.abort();
    }, [jwtToken, updateTrigger]);

    return { pets, loading, error };
};

export { useFetchPets };