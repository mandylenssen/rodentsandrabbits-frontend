import "./PetCard.css";
import Button from "../button/Button.jsx";
import React, {useState} from "react";
import EditPetForm from "../editpetform/EditPetForm.jsx";
import {format} from 'date-fns';
import useFetchPetImage from "../../hooks/useFetchPetImage.jsx";
import Spinner from "../spinner/Spinner.jsx";
import axios from "axios";
import DeletePetPopUp from "../deletepetpopup/DeletePetPopUp.jsx";

function PetCard({pet, updateTrigger}) {
    const formattedDate = pet.birthday ? format(new Date(pet.birthday), 'dd/MM/yyyy') : 'Unknown';
    const [isEditing, setIsEditing] = useState(false);
    const {petImageUrl, isLoading, error} = useFetchPetImage(pet);
    const jwtToken = localStorage.getItem("token");
    const [isModalOpen, setIsModalOpen] = useState(false);


    const handleEditClick = () => setIsEditing(true);
    const handleCancel = () => setIsEditing(false);
    const handleSuccess = () => {
        setIsEditing(false);
        updateTrigger(prev => prev + 1);
    };

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    // functie voor het verwijderen van een huisdier
    async function handleDeleteConfirm() {
        try {
            await axios.delete(`http://localhost:8080/pets/${pet.id}`, {
                headers: {
                    "Authorization": `Bearer ${jwtToken}`
                }
            });
            alert(`${pet.name} is succesvol verwijderd.`);
            updateTrigger(prev => prev + 1);
        } catch (error) {
            console.error("Het verwijderen van het huisdier is mislukt:", error);
            alert("Het verwijderen van het huisdier is mislukt. Probeer het opnieuw.");
        }
        closeModal();
    }

    if (isLoading) return <Spinner/>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <section className="pet-outer-container">
            <div className="pet-inner-container" id={`petcard-${pet.id}`}>
                {isEditing ? (
                    <EditPetForm pet={pet} onCancel={handleCancel} onSuccess={handleSuccess}/>
                ) : (
                    <div className="pet-card">
                        <div className="pet-info">
                            <h1 className="detail-value">{pet.name}</h1>
                            <div className="detail-row">
                                <p className="detail-label">Date of Birth:</p>
                                <p className="detail-value">{formattedDate}</p></div>
                            <div className="detail-row">
                                <p className="detail-label">Species:</p>
                                <p className="detail-value">{pet.species}</p></div>
                            <div className="detail-row">
                                <p className="detail-label">Gender:</p>
                                <p className="detail-value">{pet.gender}</p></div>
                            <div className="detail-row">
                                <p className="detail-label">Medication:</p>
                                <p className="detail-value">{pet.medication}</p></div>
                            <div className="detail-row">
                                <p className="detail-label">Special Notes:</p>
                                <p className="detail-value">{pet.details}</p></div>
                            <div className="detail-row">
                                <p className="detail-label">Diet:</p>
                                <p className="detail-value">{pet.diet}</p></div>
                            <div className="pet-card-actions">
                                <Button type="button" color="secondary" onClick={handleEditClick}>
                                    Edit Pet
                                </Button>
                                <Button type="button" color="quaternary" onClick={openModal}>
                                    Delete Pet
                                </Button>
                            </div>
                        </div>
                        <DeletePetPopUp isOpen={isModalOpen} onClose={closeModal} onConfirm={handleDeleteConfirm}>
                            Are you sure you want to delete {pet.name}?
                        </DeletePetPopUp>

                        <figure className="pet-image">
                            <img className="pet-profile-image" src={petImageUrl} alt={`Profile of ${pet.name}`}/>
                        </figure>


                    </div>
                )}

            </div>
        </section>
    );
}

export default PetCard;
