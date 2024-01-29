import './RegisterPet.css'
import Button from "../../components/button/Button.jsx";
import {useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import {addMonths, addYears} from "date-fns";
import {NavLink} from "react-router-dom";
import axios from "axios";

function RegisterPet() {
    const {
        handleSubmit,
        formState: {errors},
        register,
        watch,
        // setValue
    } = useForm({mode: 'onBlur'});

    // const watchSelectedSpecies = watch('select-species');
    const source = axios.CancelToken.source();
    const [errorText, setErrorText] = useState('');

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
            if(!data) {
                console.error('Form data is undefined.');
                return;
            }
            const result = await axios.post('http://localhost:8080/pets', {
                name: data.name,
                birthday: data['date-of-birth'],
                species: data.species,
                gender: data.gender,
                details: data.details,
                medication: data.medication,
                diet: data.diet,
            }, {cancelToken: source.token});
            console.log(result.data);
        } catch (error) {
            console.error('Registration error:', error);
            setErrorText(error.response?.data?.message);
            console.log(errorText);
        }

    }

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
                            {errors['date-of-birth'] && <p className="error-text">{errors['date-of-birth'].message}</p>}
                        </label>


                        <label htmlFor="species-field">
                            <span>species*</span>
                            <select id="species-field" {...register("species", {required: true})}
                                    defaultValue={watch('select-species') || ''}>
                                <option value="" disabled>select species</option>
                                <option value="rabbit">Rabbit</option>
                                <option value="hamster">Hamster</option>
                                <option value="rat">Rat</option>
                                <option value="mouse">Mouse</option>
                                <option value="gerbil">Gerbil</option>
                                <option value="guinea-pig">Guinea pig</option>
                                <option value="chinchilla">Chinchilla</option>
                            </select>
                            {errors['select-species'] && <p className="error-text">species is required</p>}
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
                                // placeholder="medication"
                                {...register("medication")}>
                        </textarea>
                        </label>

                        <label htmlFor="special-notes-field">
                            <span>special notes</span>
                            <textarea
                                id="special-notes-field"
                                rows="4"
                                cols="40"
                                // placeholder="Special notes"
                                {...register("details")}>
                        </textarea>
                        </label>

                        <label htmlFor="diet-field">
                            <span>diet</span>
                            <textarea
                                id="diet-field"
                                rows="4"
                                cols="40"
                                // placeholder="diet"
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
                    <Button className="" type="submit" color="tertiary">save</Button>
                </div>
            </form>
        </>
    )
}

export default RegisterPet;
