import "./PetCard.css";
import Button from "../button/Button.jsx";
import {useState} from "react";
import EditPetForm from "../editpetform/EditPetForm.jsx";
import { format } from 'date-fns';
import useFetchPetImage from "../../hooks/useFetchPetImage.jsx";

function PetCard({ pet, updateTrigger }) {
    const formattedDate = pet.birthday ? format(new Date(pet.birthday), 'dd/MM/yyyy') : 'Unknown';
    const [isEditing, setIsEditing] = useState(false);
    const { petImageUrl, isLoading, error } = useFetchPetImage(pet);



    const handleEditClick = () => setIsEditing(true);
    const handleCancel = () => setIsEditing(false);
    const handleSuccess = () => {
        setIsEditing(false);
        updateTrigger(prev => prev + 1);
    };

    if (isLoading) return <p>Loading image...</p>;
    if (error) return <p>Error loading image.</p>;


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
                            <div className="detail-value">
                                <Button type="button" color="quaternary" onClick={handleEditClick}>
                                    Edit Pet
                                </Button></div>
                        </div>

                        <figure className="pet-image">
                            <img className="pet-profile-image" src={petImageUrl} alt={`Profile of ${pet.name}`} />
                        </figure>


                    </div>
                )}

            </div>
        </section>
    );
}

export default PetCard;
