import { useState, useEffect } from 'react';
import axios from 'axios';

export const useFetchPetsDetails = (petIds, jwtToken) => {
    const [pets, setPets] = useState({});

    useEffect(() => {
        const fetchPetDetails = async () => {
            if (!petIds.length) return;

            const petPromises = petIds.map(petId =>
                axios.get(`http://localhost:8080/pets/${petId}`, {
                    headers: { "Authorization": `Bearer ${jwtToken}`, "Content-Type": "application/json" }
                }).then(response => ({ id: petId, data: response.data }))
                    .catch(error => console.log(`Error fetching details for pet ID ${petId}:`, error))
            );

            try {
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

        fetchPetDetails();
    }, [petIds, jwtToken]);

    return pets;
};
