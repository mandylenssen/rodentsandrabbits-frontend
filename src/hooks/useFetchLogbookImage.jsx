import { useState, useEffect } from 'react';
import axios from 'axios';

export const useFetchLogbookImage = (logbookEntries, jwtToken) => {
    const [imageUrls, setImageUrls] = useState({});

    useEffect(() => {
        logbookEntries.logs.forEach(({ logbookId, id }) => {
            const fetchImageData = async () => {
                try {
                    const response = await axios.get(`http://localhost:8080/logbooks/${logbookId}/logs/${id}/images`, {
                        headers: { "Authorization": `Bearer ${jwtToken}` },
                        responseType: "blob"
                    });
                    const imageUrl = URL.createObjectURL(response.data);
                    setImageUrls(prev => ({ ...prev, [id]: imageUrl }));
                } catch (error) {
                    console.error(`Error fetching image for log ${id}:`, error);
                }
            };

            fetchImageData();
        });
    }, [logbookEntries, jwtToken]);

    return imageUrls;
};
