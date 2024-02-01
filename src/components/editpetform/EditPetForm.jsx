import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {jwtDecode} from "jwt-decode";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function formatDate(dateString) {
    const options = {year: 'numeric', month: '2-digit', day: '2-digit'};
    return new Date(dateString).toLocaleDateString('en-GB', options);
}

function EditPetForm({pet, onCancel}) {
const {register, handleSubmit, setValue} = useForm();
    const navigate = useNavigate();
    const source = axios.CancelToken.source();
    const [errorText, setErrorText] = useState('');

    useEffect(() => {
        return () => {
            source.cancel("Component got unmounted");
        };
    }, [source]);

    useEffect(() => {
        Object.keys(pet).forEach(key => {
            if (key === 'birthday'){
                const formattedDate = formatDate(pet.birthday);
                setValue(key, formattedDate);
            } else {
                setValue(key, pet[key]);
            }

        });
    }, [pet, setValue]);

    const onSubmit = async data => {
        try {
            console.log('Form data:', data);
            const jwtToken = localStorage.getItem('token');
            const decodedToken = jwtDecode(jwtToken);
            const ownerUsername = decodedToken.sub;

            const result = await axios.put('http://localhost:8080/pets', {
                ...data,
                ownerUsername
            }, {
                headers: {
                    'Authorization': `Bearer ${jwtToken}`,
                    'Content-Type': 'application/json'
                },
                cancelToken: source.token,
            });
            console.log('Pet updated successfully:', result.data);
            navigate('/mypets');
        } catch (error) {
            console.error('Error updating pet:', error.response?.data);
            setErrorText(error.response?.data?.message || "An error occurred");
        }
    };
    function formatDate(dateString) {
        const date = new Date(dateString);
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" {...register('name')} />
            </div>
            <div>
                <label htmlFor="birthday">Date of Birth:</label>
                <input type="date" id="birthday" {...register('birthday')} />
            </div>
            <div>
                <label htmlFor="species">Species:</label>
                <input type="text" id="species" {...register('species')} />
            </div>
            <div>
                <label htmlFor="gender">Gender:</label>
                <input type="text" id="gender" {...register('gender')} />
            </div>
            <div>
                <label htmlFor="medication">Medication:</label>
                <input type="text" id="medication" {...register('medication')} />
            </div>
            <div>
                <label htmlFor="details">Special Notes:</label>
                <textarea id="details" {...register('details')} />
            </div>
            <div>
                <label htmlFor="diet">Diet:</label>
                <input type="text" id="diet" {...register('diet')} />
            </div>
            <div>
                <button type="submit">Save</button>
                <button type="button" onClick={onCancel}>
                    Cancel
                </button>
            </div>
        </form>
    );
}

export default EditPetForm;
