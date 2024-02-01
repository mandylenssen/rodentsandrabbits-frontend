import './PetCard.css';
import Button from "../button/Button.jsx";
import {useState} from "react";
import EditPetForm from "../editpetform/EditPetForm.jsx";

function formatDate(dateString) {
    const options = {year: 'numeric', month: '2-digit', day: '2-digit'};
    return new Date(dateString).toLocaleDateString('en-GB', options);
}

function PetCard({pet, onSave}) {
    const formattedDate = formatDate(pet.birthday);
    const [isEditing, setIsEditing] = useState(false);

    const handleEditClick = () => {
        setIsEditing(true);
    };
    const handleCancel = () => {
        setIsEditing(false);
    }

    return (
        <div className="inner-container pet-container">
            {isEditing ? (
                <div className="edit-pet-form">
                    <EditPetForm pet={pet} onSave={onSave} onCancel={handleCancel}/>

                </div>
            ) : (

                <div className="pet-info">
                    <h4>{pet.name}</h4>
                    <p>Date of Birth: {formattedDate}</p>
                    <p>Species: {pet.species}</p>
                    <p>Gender: {pet.gender}</p>
                    <p>Medication: {pet.medication}</p>
                    <p>Special Notes: {pet.details}</p>
                    <p>Diet: {pet.diet}</p>
                    <Button type="button" color="quaternary" onClick={handleEditClick}>
                        Edit Pet
                    </Button>

                </div>
            )}
            <div className="pet-image">
                <img src={pet.imageUrl} alt={pet.name}/>
            </div>
        </div>
    );
}

export default PetCard;
