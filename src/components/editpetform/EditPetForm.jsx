import React, {useEffect, useState} from "react";
import "./EditPetForm.css";
import {useForm} from "react-hook-form";
import {jwtDecode} from "jwt-decode";
import axios from "axios";
import Button from "../button/Button.jsx";
import {validateDateOfBirth, validateName, validatePhoto} from "../../utilities/formValidation.jsx";


function EditPetForm({pet, onCancel, onSuccess}) {

    // const {register, handleSubmit, setValue, formState: { errors }} = useForm({mode: "onBlur"});
    const source = axios.CancelToken.source();
    const [errorText, setErrorText] = useState("");
    const {
        handleSubmit,
        setValue,
        formState: {errors},
        register,
        watch,
    } = useForm({mode: 'onBlur'});

    // Opruimen wanneer de component unmounts om lopende verzoeken te annuleren
    useEffect(() => {
        return () => {
            source.cancel("Component got unmounted");
        };
    }, [source]);

    // Vul de formulier velden in met bestaande gegevens van het huisdier
    useEffect(() => {
        Object.keys(pet).forEach(key => {
            if (key === "birthday") {
                const formattedDate = formatDate(pet.birthday);
                setValue(key, formattedDate);
                setValue(key, formattedDate);
            } else {
                setValue(key, pet[key]);
            }

        });
    }, [pet, setValue]);


    const onSubmit = async data => {
        try {
            console.log("Form data:", data);
            const jwtToken = localStorage.getItem("token");
            const decodedToken = jwtDecode(jwtToken);
            const ownerUsername = decodedToken.sub;
            const {photo, ...petData} = data;
            // Bijwerken van huisdier informatie
            await axios.put(`http://localhost:8080/pets/${pet.id}`, {
                ...petData,
                ownerUsername
            }, {
                headers: {
                    "Authorization": `Bearer ${jwtToken}`,
                    "Content-Type": "application/json"
                },
            });
            // Optioneel: upload de foto als deze is geselecteerd
            if (photo && photo.length > 0) {
                const formData = new FormData();
                formData.append("file", photo[0]);
                await axios.put(`http://localhost:8080/pets/${pet.id}/profileImage`, formData, {
                    headers: {
                        "Authorization": `Bearer ${jwtToken}`,
                        "Content-Type": "multipart/form-data"
                    }
                });
            }
            // Roep onSuccess callback aan als alles succesvol is
            onSuccess();
        } catch (error) {
            console.error("Error updating pet:", error);
            setErrorText(error.response?.data?.message || "An error occurred");
        }
    };

    function formatDate(dateString) {
        const date = new Date(dateString);
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
    }


    return (
        <form className="inner-pet-form-container" onSubmit={handleSubmit(onSubmit)}>

            {/*----- Pet name -----*/}
            <div className="edit-pet-row">
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    {...register("name", {
                        validate: validateName
                    })}/>
                {errors.name && <p className="error-text">{errors.name.message}</p>}
             </div>

            {/*----- pet birthday -----*/}
            <div className="edit-pet-row">
                <label htmlFor="birthday">Date of Birth:</label>
                <input type="date" id="birthday"
                       {...register("birthday", {
                           required: {value: true, message: "Date of birth is required"},
                           validate: validateDateOfBirth,
                       })}
                />
                {errors["date-of-birth"] && <p className="error-text">{errors["date-of-birth"].message}</p>}
            </div>

            {/*----- Pet species -----*/}
            <div className="edit-pet-row">
                <label htmlFor="species">Species:</label>
                <select id="species" {...register("species", {required: true})}
                        defaultValue={watch("species") || ""}>
                    <option value="" disabled>select species</option>
                    <option value="rabbit">Rabbit</option>
                    <option value="hamster">Hamster</option>
                    <option value="rat">Rat</option>
                    <option value="mouse">Mouse</option>
                    <option value="gerbil">Gerbil</option>
                    <option value="guinea-pig">Guinea pig</option>
                    <option value="chinchilla">Chinchilla</option>
                </select>
                {errors["species"] && <p className="error-text">species is required</p>}
            </div>

            {/*----- pet gender -----*/}
            <div className="edit-pet-row">
                <label htmlFor="gender">Gender:</label>
                <select id="gender-field" {...register("gender", {required: true})}
                        defaultValue={watch("gender") || ""}>
                    <option value="" disabled>Select gender</option>
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                </select>
            </div>

            {/*----- pet medication -----*/}
            <div className="edit-pet-row">
                <label htmlFor="medication">Medication:</label>
                <textarea id="medication" rows="4" cols="40"
                          {...register("medication")}>
                        </textarea>
            </div>

            {/*----- special notes -----*/}
            <div className="edit-pet-row">
                <label htmlFor="details">Special Notes:</label>
                <textarea id="details" rows="4" cols="40"
                          {...register("details")}>
                        </textarea>
            </div>

            {/*----- pet diet -----*/}
            <div className="edit-pet-row">
                <label htmlFor="diet">Diet:</label>
                <textarea id="diet" rows="4" cols="40"
                          {...register("diet")}>
                        </textarea>
            </div>

            {/*----- pet photo -----*/}
            <div className="edit-pet-row">
                <label htmlFor="imageUrl">Image URL:</label>
                <input type="file" id="photo-field"
                       {...register("photo", {
                           validate: validatePhoto(false)
                       })}
                />
                {errors.photo && <p className="error-text">{errors.photo.message}</p>}
            </div>

            <div className="edit-form-button-wrapper">
                <Button type="submit" color="quaternary">Save</Button>
                <Button onClick={onCancel} type="button" color="quaternary">Cancel</Button>
                {errorText && <p className="error-text">{errorText}</p>}
            </div>
        </form>
    );
}

export default EditPetForm;
