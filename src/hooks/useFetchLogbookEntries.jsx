import axios from "axios";

export const fetchLogbookEntries = async (username, jwtToken, setLogbookEntries, setError) => {
    try {
        const response = await axios.get(`http://localhost:8080/logbooks/user/${username}`, {
            headers: { Authorization: `Bearer ${jwtToken}` },
        });
        if (response.data && Array.isArray(response.data.logs)) {
            setLogbookEntries(response.data);
        } else {
            console.error('Unexpected response structure:', response.data);
            setError('Unexpected data structure received');
        }
    } catch (error) {
        console.error('Error fetching logbook data:', error);
        setError('Failed to fetch logbook data');
    }
};
