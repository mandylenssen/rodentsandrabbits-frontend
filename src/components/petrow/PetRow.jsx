import useFetchPetImage from "../../hooks/useFetchPetImage.jsx";
import "./PetRow.css";
import Spinner from "../spinner/Spinner.jsx";

function PetRow({pet, startDate, endDate}) {
    const {petImageUrl, isLoading, error: imageError} = useFetchPetImage(pet);

    const calculateAge = (birthday) => {
        const birthdayDate = new Date(birthday);
        const ageDifMs = Date.now() - birthdayDate.getTime();
        const ageDate = new Date(ageDifMs);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    };

    return (
        <>
            <tr>

                <td>{pet.name}</td>
                <td>{isLoading ? (
                    <Spinner/>
                ) : imageError ? (
                    <p>Error fetching image</p>
                ) : (
                    <img src={petImageUrl} alt={pet.name} className="pet-row-image"/>
                )}
                </td>
                <td>
                    {startDate ? new Date(startDate).toLocaleDateString() : 'N/A'}{' '}
                    until{' '}
                    {endDate ? new Date(endDate).toLocaleDateString() : 'N/A'}
                </td>
                <td>{calculateAge(pet.birthday)} years</td>
                <td>{pet.species}</td>
                <td>{pet.gender}</td>
                <td>{pet.medication || 'N/A'}</td>
                <td>{pet.diet || ''}</td>
                <td>{pet.details}</td>
                <td></td>
            </tr>
        </>
    );
}

export default PetRow;