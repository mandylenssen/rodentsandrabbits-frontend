import { useEffect, useState } from "react";
import axios from "axios";

const useFetchPetImage = (pet) => {
    const [petImageUrl, setPetImageUrl] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
       async function fetchPetImage() {
            setIsLoading(true);
            const jwtToken = localStorage.getItem("token");

            try {
                const response = await axios.get(`http://localhost:8080/pets/${pet.id}/profileImage`, {
                    headers: {
                        "Authorization": `Bearer ${jwtToken}`,
                        "Content-Type": "application/json"
                    },
                    responseType: 'blob'
                });
                const imageObjectURL = URL.createObjectURL(response.data);
                setPetImageUrl(imageObjectURL);
                setError(null);
            } catch (error) {
                console.error('Error fetching pet image:', error);
                setError(error);
            } finally {
                setIsLoading(false);
            }
        }

        if (pet.id) {
            fetchPetImage();
        }
    }, [pet.id]);

    return { petImageUrl, isLoading, error };
};

export default useFetchPetImage;
