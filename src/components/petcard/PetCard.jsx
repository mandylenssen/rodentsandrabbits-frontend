import './PetCard.css';
import Button from "../button/Button.jsx";
import {useState} from "react";
import EditPetForm from "../editpetform/EditPetForm.jsx";

function formatDate(dateString) {
    const options = {year: 'numeric', month: '2-digit', day: '2-digit'};
    return new Date(dateString).toLocaleDateString('en-GB', options);
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
    const handleSuccess = (result) => {
        setIsEditing(false);
        updateTrigger(prev => prev + 1);
    };

    const imageUrl = `http://localhost:8080/pets/${pet.id}/profileImage`;

    return (
        <div className="inner-container pet-container">
            {isEditing ? (
                <div className="edit-pet-form">
                    <EditPetForm pet={pet} onCancel={handleCancel} onSuccess={handleSuccess}/>

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
                    <div className="pet-image">
                        <img src={imageUrl} alt={pet.name} />
                    </div>
                    <Button type="button" color="quaternary" onClick={handleEditClick}>
                        Edit Pet
                    </Button>

                </div>
            )}

        </div>
    );
}

export default PetCard;
