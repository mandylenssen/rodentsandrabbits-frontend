import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {jwtDecode} from "jwt-decode";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import Button from "../button/Button.jsx";


function EditPetForm({pet, onCancel, onSuccess}) {
    const {register, handleSubmit, setValue} = useForm();
    // const navigate = useNavigate();
    const source = axios.CancelToken.source();
    const [errorText, setErrorText] = useState("");

    useEffect(() => {
        return () => {
            source.cancel("Component got unmounted");
        };
    }, [source]);

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
            const result = await axios.put(`http://localhost:8080/pets/${pet.id}`, {
                ...petData,
                ownerUsername
            }, {
                headers: {
                    "Authorization": `Bearer ${jwtToken}`,
                    "Content-Type": "application/json"
                },
            });
            console.log(result.data);
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
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" {...register("name")} />
            </div>
            <div>
                <label htmlFor="birthday">Date of Birth:</label>
                <input type="date" id="birthday" {...register("birthday")} />
            </div>
            <div>
                <label htmlFor="species">Species:</label>
                <input type="text" id="species" {...register("species")} />
            </div>
            <div>
                <label htmlFor="gender">Gender:</label>
                <input type="text" id="gender" {...register("gender")} />
            </div>
            <div>
                <label htmlFor="medication">Medication:</label>
                <input type="text" id="medication" {...register("medication")} />
            </div>
            <div>
                <label htmlFor="details">Special Notes:</label>
                <textarea id="details" {...register("details")} />
            </div>
            <div>
                <label htmlFor="diet">Diet:</label>
                <input type="text" id="diet" {...register("diet")} />
            </div>
            <div>
                <label htmlFor="imageUrl">Image URL:</label>
                <input type="file" id="photo-field" {...register("photo")}  />

            </div>
            <div>
                <Button type="submit" color="primary">Save</Button>
                <Button onClick={onCancel} type="button" color="secondary">Cancel</Button>
                {errorText && <p className="error-text">{errorText}</p>}
            </div>
        </form>
    );
}

export default EditPetForm;
