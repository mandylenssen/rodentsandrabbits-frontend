import "./MyPets.css"
import {NavLink} from "react-router-dom";
import Button from "../../components/button/Button.jsx";
import {useCallback, useState} from "react";
import PetCard from "../../components/petcard/PetCard.jsx";
import {useFetchPets} from "../../hooks/useFetchPets.jsx";
import PetGalleryImage from "../../components/petgalleryimage/PetGalleryImage.jsx";
import Spinner from "../../components/spinner/Spinner.jsx";


function MyPets() {


    const jwtToken = localStorage.getItem("token");
    const [updateTrigger, setUpdateTrigger] = useState(0);
    const {pets, loading, error} = useFetchPets(jwtToken, updateTrigger);

    const handleSuccess = useCallback(() => {
        setUpdateTrigger(prev => prev + 1);
    }, []);


    return (
        <>
            <section className="mypets-outer-container">
                <div className="inner-container">
                    {loading ? (<Spinner/>) : pets.length === 0 ? (

                        <div className="no-pet-container">
                            <h1>You haven't registered a pet yet</h1>

                            <NavLink to="/registerpet">
                                <Button type="button" color="secondary">Register Pet</Button>
                            </NavLink></div>
                    ) : error ? (

                        <p className="error-message">{error}</p>

                    ) : (
                        <div>
                            <div className="pet-gallery-container">
                                <h1>My Pets</h1>
                                <div className="mypets-gallery">
                                    {pets.map((pet, index) => (
                                        <PetGalleryImage key={index} pet={pet} />
                                    ))}
                                </div>
                                <div className="button-wrapper">
                                    <NavLink to="/registerpet">
                                        <Button type="button" color="quaternary">Register new Pet</Button>
                                    </NavLink>
                                    <NavLink to="/logbook">
                                        <Button type="button" color="secondary">logbook</Button>
                                    </NavLink>
                                </div>

                            </div>

                        </div>
                    )}
                </div>
                <div className="petcard-container">
                    {pets.map((pet, index) => (
                        <PetCard key={index} pet={pet} updateTrigger={handleSuccess}/>
                    ))}</div>
            </section>
        </>
    );
}

export default MyPets;
