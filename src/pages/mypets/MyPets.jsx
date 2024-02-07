import './MyPets.css'
import {NavLink} from "react-router-dom";
import Button from "../../components/button/Button.jsx";
import {useEffect, useState} from "react";
import PetCard from "../../components/petcard/PetCard.jsx";
import {useFetchPets} from "../../hooks/useFetchPets.jsx";


function MyPets() {


    const jwtToken = localStorage.getItem('token');
    const [updateTrigger, setUpdateTrigger] = useState(0);
    const { pets, loading, error } = useFetchPets(jwtToken, updateTrigger);


// const useFetchPets = (jwtToken) => {
//     const [pets, setPets] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//
//     useEffect(() => {
//         const controller = new AbortController();
//         const signal = controller.signal;
//
//         async function fetchPets() {
//             try {
//                 const response = await axios.get('http://localhost:8080/pets/user', {
//                     headers: {
//                         'Authorization': `Bearer ${jwtToken}`,
//                         'Content-Type': 'application/json'
//                     },
//                     signal: signal,
//                 });
//                 setPets(response.data);
//                 console.log(response.data);
//             } catch (error) {
//                 if (axios.isCancel(error)) {
//                     console.log('Request canceled', error.message);
//                 } else {
//                     setError('Failed to load pets. Please try again later.');
//                 }
//             } finally {
//                 setLoading(false);
//             }
//         }
//
//         fetchPets();
//
//
//         // Cleanup function to abort the request if the component unmounts
//         return () => controller.abort();
//
//     }, [jwtToken, updateTrigger]);
//     return {pets, loading, error};
// };

    return (
        <>
            <section className="mypets-outer-container outer-container">
                <div className="inner-container">
                    {loading ? (<p>Loading...</p>) : pets.length === 0 ? (

                        <div>
                            <h3>You haven't registered a pet yet</h3>

                            <NavLink to="/registerpet">
                                <Button type="button" color="secondary">Register Pet</Button>
                            </NavLink></div>
                    ) : error ? (

                            <p className="error-message">{error}</p>

                        ) : (

                        <div>
                            <h3>My Pets</h3>
                            <div className="mypets-gallery">
                                {pets.map((pet, index) => (
                                    <img key={index} src={pet.imageUrl} alt={pet.name}/>
                                ))}
                                <NavLink to="/registerpet">
                                    <Button type="button" color="quaternary">Register new Pet</Button>
                                </NavLink>
                                <NavLink to="/logbook">
                                    <Button type="button" color="secondary">logbook</Button>
                                </NavLink>
                            </div>
                            {pets.map((pet, index) => (
                                <PetCard key={index} pet={pet} updateTrigger={setUpdateTrigger} />
                            ))}

                        </div>

                    )}
                </div>
            </section>
        </>
    );
}

export default MyPets;
