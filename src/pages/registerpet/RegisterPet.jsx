import './RegisterPet.css'
import Button from "../../components/button/Button.jsx";
import {useForm} from "react-hook-form";
import {useEffect} from "react";


function RegisterPet() {
    const {handleSubmit, formState: {errors}, register, watch, setValue} = useForm({mode: 'onBlur'});

    const watchSelectedSpecies = watch('select-species');

    function handleFormSubmit(data) {
        console.log(data);
    }

    useEffect(() => {
        if (watchSelectedSpecies !== 'other') {
            setValue('add-other-species', '');
        }

        return () => {
            setValue('add-other-species', '');
        };
    }, [watchSelectedSpecies, setValue]);


    //test

    return (
        <>

            <form className="register-pet-container outer-container" onSubmit={handleSubmit(handleFormSubmit)}>
                <div className="register-pet-content">
                    <h3>Register pet</h3>

                    <div className="top-form-entry-wrapper">
                    <label htmlFor="name-field">
                        name*
                        <input
                            type="text"
                            id="name-field"
                            {...register("name", {
                                required: {
                                    value: true,
                                    message: 'Dit veld is verplicht',
                                },
                                minLength: {
                                    value: 2,
                                    message: 'Minimaal 2 karakters',
                                },
                                maxLength: {
                                    value: 20,
                                    message: 'Maximaal 20 karakters',
                                },
                            })}
                            placeholder="enter pet name"
                        />
                        {errors.name && <p className="error-text">{errors.name.message}</p>}
                    </label>

                    <label htmlFor="date-of-birth-field">
                        date of birth*
                        <input
                            type="date"
                            id="date-of-birth-field"
                            {...register("date-of-birth", {required: true})}
                        />
                        {errors['date-of-birth'] && <p className="error-text">Date of birth is required</p>}
                    </label>

                    <label htmlFor="species-field">
                        species*
                        <select id="species-field" {...register("select-species", {required: true})} defaultValue="">
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
                        {errors['select-species'] && <p className="error-text">Species is required</p>}
                    </label>

                    {watchSelectedSpecies === "other" &&
                        <input
                            type="text"
                            {...register("add-other-species")}
                        />
                    }

                    <label htmlFor="gender-field">
                        gender*
                        <select id="gender-field" {...register("gender", { required: true })}>
                            <option value="" disabled>Select gender</option>
                            <option value="female">Female</option>
                            <option value="male">Male</option>
                        </select>
                        {errors['gender'] && <p className="error-text">Gender is required</p>}
                    </label>
                    </div>

                    <label htmlFor="medication-field">
                        medication
                        <textarea
                            id="medication-field"
                            rows="4"
                            cols="40"
                            placeholder="medication"
                            {...register("medication-content")}>
                        </textarea>
                    </label>

                    <label htmlFor="special-notes-field">
                        special notes
                        <textarea
                            id="special-notes-field"
                            rows="4"
                            cols="40"
                            placeholder="Special notes"
                            {...register("special-notes-content")}>
                        </textarea>
                    </label>

                    <label htmlFor="diet-field">
                        diet
                        <textarea
                            id="diet-field"
                            rows="4"
                            cols="40"
                            placeholder="diet"
                            {...register("diet-content")}>
                        </textarea>
                    </label>


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
