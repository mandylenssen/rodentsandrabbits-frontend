import useFetchPetImage from "../../hooks/useFetchPetImage.jsx";
import "./PetRow.css";

function PetRow({ pet, startDate, endDate }) {
    const { petImageUrl, isLoading, error: imageError } = useFetchPetImage(pet);

    return (
        <>
            <tr>
                <td className="special-padding">
                    <div className="pet-info-container">
                        <div className="pet-name-box">{pet.name}</div>
                        {isLoading ? (
                            <p>Loading Image...</p>
                        ) : imageError ? (
                            <p>Error fetching image</p>
                        ) : (
                            <img src={petImageUrl} alt={pet.name} className="pet-image"/>
                        )}
                    </div>
                </td>
                <td>
                    {startDate ? new Date(startDate).toLocaleDateString() : 'N/A'}{' '}
                    until{' '}
                    {endDate ? new Date(endDate).toLocaleDateString() : 'N/A'}
                </td>

                <td>{pet.medication || ''}</td>
                <td>{pet.diet || ''}</td>
                <td>{pet.details}</td>
                <td></td>
            </tr>
        </>
    );
}

export default PetRow;