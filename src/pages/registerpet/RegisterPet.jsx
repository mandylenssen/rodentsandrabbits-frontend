import './RegisterPet.css'
import Button from "../../components/button/Button.jsx";
import {useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import {addMonths, addYears} from "date-fns";
import {NavLink, useNavigate} from "react-router-dom";
import axios from "axios";
import {jwtDecode} from "jwt-decode";

function RegisterPet() {
    const {
        handleSubmit,
        formState: {errors},
        register,
        watch,
    } = useForm({mode: 'onBlur'});

    const navigate = useNavigate();
    const source = axios.CancelToken.source();
    const [errorText, setErrorText] = useState('');
    const jwtToken = localStorage.getItem('token');

    const validatePhoto = (value) => {
        if (value && value.length > 0) {
            const file = value[0];
            const fileName = file.name;
            if (fileName) {
                const allowedExtensions = ['jpg', 'jpeg', 'png'];
                const fileExtension = fileName.split('.').pop().toLowerCase();
                if (!allowedExtensions.includes(fileExtension)) {
                    return 'Invalid file format. Please upload a JPG or PNG file.';
                }
                const maxFileSize = 10 * 1024 * 1024;
                if (file.size > maxFileSize) {
                    return 'File is too large. Max 10MB allowed.';
                }
            }
            return true;
        }
    }

    const validateDateOfBirth = (value) => {
        const dateOfBirth = new Date(value);
        const minDate = addYears(new Date(), -20);
        const maxDate = addMonths(new Date(), -3);

        if (dateOfBirth < minDate) {
            return 'Date of birth must be after 01-01-2000';
        }

        if (dateOfBirth > maxDate) {
            return 'Date of birth must be before 31-12-2022';
        }

        return true;
    };


    async function handleFormSubmit(data) {
        try {
            console.log('Form data:', data);
            // const jwtToken = localStorage.getItem('token');
            const decodedToken = jwtDecode(jwtToken);
            const ownerUsername = decodedToken.sub;

            const result = await axios.post('http://localhost:8080/pets', {
                name: data.name,
                birthday: data['date-of-birth'],
                species: data.species,
                gender: data.gender,
                details: data.details,
                medication: data.medication,
                diet: data.diet,
                enabled: true,
                ownerUsername: ownerUsername
            }, {
                headers: {
                    'Authorization': `Bearer ${jwtToken}`,
                    'Content-Type': 'application/json'
                },
                cancelToken: source.token,
            });
            console.log('Pet added successfully:', result.data);
            const petId = result.data.id;
            const photoFile = data.photo;

            if (photoFile && photoFile.length > 0) {
                await uploadProfileImage(petId, photoFile);
                navigate('/mypets');
            } else {
                console.log('No photo to upload');
                navigate('/mypets');
            }
            navigate('/mypets');
        } catch (error) {
            console.error('Error adding pet:', error.response?.data);
            console.log('Error message:', error.message);
            setErrorText(error.response?.data?.message);

        }
    }


    const uploadProfileImage = async (petId, photoFile) => {
        const formData = new FormData();
        formData.append('file', photoFile[0]);

        try {
            await axios.post(`http://localhost:8080/pets/${petId}/profileImage`, formData, {
                headers: {
                    'Authorization': `Bearer ${jwtToken}`,
                    'Content-Type': 'multipart/form-data'
                },
            });
            console.log('Profile image uploaded successfully');
        } catch (error) {
            console.error('Error uploading profile image:', error);
        }
    };

        return (
            <>

                <form className="register-pet-container outer-container" onSubmit={handleSubmit(handleFormSubmit)}>
                    <div className="register-pet-inner-container">
                        <h3>Register pet</h3>

                        <div className="top-form-entry-wrapper">
                            <label htmlFor="name-field">
                                <span>name*</span>
                                <input
                                    type="text"
                                    id="name-field"
                                    {...register("name", {
                                        required: {
                                            value: true,
                                            message: 'name is required',
                                        },
                                        minLength: {
                                            value: 2,
                                            message: 'name must contain at least 2 characters',
                                        },
                                        maxLength: {
                                            value: 20,
                                            message: 'name can contain a maximum of 20 characters',
                                        },
                                    })}
                                    placeholder="enter pet name"
                                />
                                {errors.name && <p className="error-text">{errors.name.message}</p>}
                            </label>


                            <label htmlFor="date-of-birth-field">
                                <span>date of birth*</span>
                                <input
                                    type="date"
                                    id="date-of-birth-field"
                                    {...register("date-of-birth", {
                                        required: {
                                            value: true,
                                            message: 'Date of birth is required',
                                        },
                                        validate: validateDateOfBirth,

                                    })}
                                />
                                {errors['date-of-birth'] &&
                                    <p className="error-text">{errors['date-of-birth'].message}</p>}
                            </label>


                            <label htmlFor="species-field">
                                <span>species*</span>
                                <select id="species-field" {...register("species", {required: true})}
                                        defaultValue={watch('species') || ''}>
                                    <option value="" disabled>select species</option>
                                    <option value="rabbit">Rabbit</option>
                                    <option value="hamster">Hamster</option>
                                    <option value="rat">Rat</option>
                                    <option value="mouse">Mouse</option>
                                    <option value="gerbil">Gerbil</option>
                                    <option value="guinea-pig">Guinea pig</option>
                                    <option value="chinchilla">Chinchilla</option>
                                </select>
                                {errors['species'] && <p className="error-text">species is required</p>}
                            </label>

                            <label htmlFor="gender-field">
                                <span>gender*</span>
                                <select id="gender-field" {...register("gender", {required: true})}
                                        defaultValue={watch('gender') || ''}>
                                    <option value="" disabled>Select gender</option>
                                    <option value="female">Female</option>
                                    <option value="male">Male</option>
                                </select>
                                {errors['gender'] && <p className="error-text">gender is required</p>}
                            </label>
                        </div>

                        <div className="field-wrapper">
                            <label htmlFor="medication-field">
                                <span>medication</span>
                                <textarea
                                    id="medication-field"
                                    rows="4"
                                    cols="40"
                                    {...register("medication")}>
                        </textarea>
                            </label>

                            <label htmlFor="special-notes-field">
                                <span>special notes</span>
                                <textarea
                                    id="special-notes-field"
                                    rows="4"
                                    cols="40"
                                    {...register("details")}>
                        </textarea>
                            </label>

                            <label htmlFor="diet-field">
                                <span>diet</span>
                                <textarea
                                    id="diet-field"
                                    rows="4"
                                    cols="40"
                                    {...register("diet")}>
                        </textarea>
                            </label>


                            <label className="custom-label-for-file" htmlFor="photo-field">
                                {/*<span className="custom-upload-text">upload photo</span>*/}

                                <input
                                    type="file"
                                    id="photo-field"
                                    {...register("photo", {
                                        // required: {
                                        //     value: true,
                                        //     message: "please upload a photo of your pet"
                                        // },
                                        validate: validatePhoto,
                                    })}
                                />
                                {errors.photo && (
                                    <p className="error-text">{errors.photo.message}</p>
                                )}
                                <span
                                    className="photo-requirements-text">photo should be max 10mb and in a JPG or PNG file</span>
                            </label>


                        </div>
                        <Button color="tertiary" type="submit">save</Button>
                    </div>
                </form>
            </>
        )
    }

export default RegisterPet;
