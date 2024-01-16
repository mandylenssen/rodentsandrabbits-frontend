import './RegisterPet.css'
import Button from "../../components/button/Button.jsx";
import {useForm } from "react-hook-form";
import {useEffect} from "react";


function RegisterPet() {
    const {handleSubmit,
        formState: {errors},
        register,
        watch,
        setValue
    } = useForm({mode: 'onBlur'});

    const watchSelectedSpecies = watch('select-species');

    function handleFormSubmit(data) {
        console.log(data);
    }

    useEffect(() => {
        if (watchSelectedSpecies !== 'other') {
            setValue('add-other-species', '');
        }
    }, [watchSelectedSpecies, setValue]);

    const validatePhoto = (value) => {
        if (value) {
            const fileName = value.name;
            if (fileName) {
                const allowedExtensions = ['jpg', 'jpeg', 'png'];
                const fileExtension = fileName.split('.').pop().toLowerCase();
                if (!allowedExtensions.includes(fileExtension)) {
                    return 'Invalid file format. Please upload a JPG or PNG file.';
                }
            }
        }
        return true;
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
                                required: 'Date of birth is required',
                                // min: { value: '2000-01-01', message: 'Date of birth must be after 2000-01-01' },
                                // max: { value: '2021-12-31', message: 'Date of birth must be before 2023-12-31' },
                            })}
                        />
                        {errors['date-of-birth'] && <p className="error-text">{errors['date-of-birth'].message}</p>}
                    </label>


                    <label htmlFor="species-field">
                        <span>species*</span>
                        <select id="species-field" {...register("select-species", {required: true})}
                                defaultValue={watch('select-species') || ''}>
                            <option value="" disabled>select species</option>
                            <option value="rabbit">Rabbit</option>
                            <option value="hamster">Hamster</option>
                            <option value="rat">Rat</option>
                            <option value="mouse">Mouse</option>
                            <option value="gerbil">Gerbil</option>
                            <option value="guinea-pig">Guinea pig</option>
                            <option value="chinchilla">Chinchilla</option>
                            <option value="other">Other</option>
                        </select>
                        {errors['select-species'] && <p className="error-text">species is required</p>}
                    </label>

                    {watchSelectedSpecies === "other" &&
                        <input
                            type="text"
                            {...register("add-other-species")}
                        />
                    }

                    <label htmlFor="gender-field">
                        <span>gender*</span>
                        <select id="gender-field" {...register("gender", { required: true })}
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
                            {...register("medication-content")}>
                        </textarea>
                    </label>

                    <label htmlFor="special-notes-field">
                        <span>special notes</span>
                        <textarea
                            id="special-notes-field"
                            rows="4"
                            cols="40"
                            // placeholder="Special notes"
                            {...register("special-notes-content")}>
                        </textarea>
                    </label>

                    <label htmlFor="diet-field">
                        <span>diet</span>
                        <textarea
                            id="diet-field"
                            rows="4"
                            cols="40"
                            // placeholder="diet"
                            {...register("diet-content")}>
                        </textarea>
                    </label>


                    <label className="custom-label-for-file" htmlFor="photo-field">
                        <span className="custom-upload-text">upload photo</span>
                        <input
                            type="file"
                            id="photo-field"
                            {...register("photo", {
                                required: {
                                value: true,
                                message: "please upload a photo of your pet"
                                },
                                    validate: validatePhoto,
                                })}
                        />
                        {errors.photo && (
                            <p className="error-text">{errors.photo.message}</p>
                        )}
                    </label>



                    </div>
                    <Button className="" type="submit" color="tertiary">save</Button>
                </div>
            </form>





            {/*<button>Register</button>*/}
            {/*<h5>Do you already have an account? Log in <Link to="/login">here</Link></h5>*/}


            {/*----------*/}


            {/*<h8>You haven't registered a pet yet</h8>*/}
            {/*<button>register pet</button>*/}
        </>
    )
}

export default RegisterPet;
