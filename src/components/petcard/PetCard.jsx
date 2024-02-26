import "./PetCard.css";
import Button from "../button/Button.jsx";
import {useEffect, useState} from "react";
import EditPetForm from "../editpetform/EditPetForm.jsx";
import bunny from "../../assets/bunny-photo-frontpage.png";

function formatDate(dateString) {
    const options = {year: "numeric", month: "2-digit", day: "2-digit"};
    return new Date(dateString).toLocaleDateString("en-GB", options);
}


function PetCard({pet, updateTrigger}) {

    const formattedDate = formatDate(pet.birthday);
    const [isEditing, setIsEditing] = useState(false);


    const handleEditClick = () => {
        setIsEditing(true);
    };
    const handleCancel = () => {
        setIsEditing(false);
    };
    const handleSuccess = () => {
        setIsEditing(false);
        updateTrigger(prev => prev + 1);
    };

    const imageUrl = `http://localhost:8080/pets/${pet.id}/profileImage`;


    return (
        <div className="pet-outer-container">
            <div className="pet-inner-container" id={`petcard-${pet.id}`}>
                {isEditing ? (
                    <div className="edit-pet-form">
                        <EditPetForm pet={pet} onCancel={handleCancel} onSuccess={handleSuccess}/>

                    </div>
                ) : (
                    <div className="pet-card">
                        <div className="pet-info">
                            <h3 className="detail-value">{pet.name}</h3>
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

                        <div className="pet-image">
                            <img className="pet-profile-image" src={imageUrl} alt={pet.name}/>
                        </div>


                    </div>
                )}

            </div>
        </div>
    );
}

export default PetCard;
