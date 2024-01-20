import './CreateAccount.css'
import {useForm} from "react-hook-form";
import Button from "../../components/button/Button.jsx";
import bunny from '../../assets/bunny-photo-create-account-page.png'
import axios from 'axios';
import {useEffect, useState} from "react";
import * as source from "react-dom/test-utils";
import {Link, useNavigate} from "react-router-dom";


function CreateAccount() {

    const {
        handleSubmit,
        formState: {errors},
        watch,
        register,
    } = useForm({mode: 'onBlur'});

    const [errorText, setErrorText] = useState('');

    //
    const navigate = useNavigate();

    // useEffect(() => {
    //     return function cleanup() {
    //         source.cancel();
    //     }
    // }, []);


    const validatePassword = (value, originalPassword) => {
        if (value === originalPassword) {
            return null;
        } else {
            return 'Passwords do not match';
        }
    }

    async function handleFormSubmit(data) {
        try {
            var result2 = await axios.post('http://localhost:8080/users', {
                firstName: data.firstname,
                lastName: data.lastname,
                phoneNumber: data.phonenumber,
                email: data.email,
                password: data.password,
                }
                )

            console.log(result2.data);
            console.log(data.firstname);

            const result = await axios.get('http://localhost:8080/users', {});
            console.log(result.data.toString());
            navigate('/');
        } catch (error) {
            console.error('Registration error:', error);
            setErrorText(error.response.data.message);
            console.log(errorText);

        }

    }

        return (
            <>

                <form className="create-account-container outer-container" onSubmit={handleSubmit(handleFormSubmit)}>

                    <div className="create-account-inner-container">

                        <div className="create-account-photo-wrapper">
                            <img className="create-account-photo" src={bunny}
                                 alt="Picture of a bunny in an outside enclosure"/>
                        </div>


                        <div className="input-fields-container">

                            <h3>Create your Account</h3>
                            <label htmlFor="firstname-field" className="label-container">
                                <span>first name*</span>
                                <input
                                    type="text"
                                    id="firstname-field"
                                    {...register("firstname", {
                                        required: {
                                            value: true,
                                            message: 'first name is required',
                                        },
                                    })}
                                    // placeholder="enter your first name"
                                />
                                {errors.firstname && <p className="error-text">{errors.firstname.message}</p>}
                            </label>


                            <label htmlFor="firstname-field" className="label-container">
                                <span>last name*</span>
                                <input
                                    type="text"
                                    id="lastname-field"
                                    {...register("lastname", {
                                        required: {
                                            value: true,
                                            message: 'last name is required',
                                        },
                                    })}
                                    // placeholder="enter your first name"
                                />
                                {errors.lastname && <p className="error-text">{errors.lastname.message}</p>}
                            </label>


                            <label htmlFor="phonenumber-field" className="label-container">
                                <span>phone number*</span>
                                <input
                                    type="tel"
                                    id="phonenumber-field"
                                    {...register("phonenumber", {
                                        required: {
                                            value: true,
                                            message: 'Phone number is required',
                                        },
                                        pattern: {
                                            value: /^(\+31)?\d{9}$/,
                                            message: 'Invalid phone number format, please enter a valid phone number',
                                        },
                                    })}
                                    defaultValue="+31"
                                />
                                {errors.phonenumber && <p className="error-text">{errors.phonenumber.message}</p>}
                            </label>


                            <label htmlFor="email-field" className="label-container">
                                <span>email address*</span>
                                <input
                                    type="email"
                                    id="email-field"
                                    {...register("email", {
                                        required: {
                                            value: true,
                                            message: 'email is required',
                                        },
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: 'Invalid email address',
                                        }
                                    })}
                                />
                                {errors.email && <p className="error-text">{errors.email.message}</p>}
                            </label>


                            <label htmlFor="password-field" className="label-container">
                                <span>Password*</span>
                                <input
                                    type="password"
                                    id="password-field"
                                    {...register("password", {
                                        required: 'Password is required',
                                        minLength: {
                                            value: 8,
                                            message: 'Password must be at least 8 characters long',
                                        },
                                        maxLength: {
                                            value: 30,
                                            message: 'Password can be up to 30 characters long',
                                        },
                                        pattern: {
                                            value: /^(?=.*\d)(?=.*[A-Z])/,
                                            message: 'Password must contain at least one digit and one capital letter',
                                        },
                                    })}
                                    placeholder="atleast 8 characters, one digit & one capital letter"
                                />
                                {errors.password && <p className="error-text">{errors.password.message}</p>}
                            </label>

                            <label htmlFor="confirm-password-field" className="label-container">
                                <span>Confirm Password*</span>
                                <input
                                    type="password"
                                    id="confirm-password-field"
                                    {...register("confirm-password", {
                                        required: {
                                            value: true,
                                            message: 'Password is required',
                                        },
                                        validate: (value) => validatePassword(value, watch('password')),
                                    })}
                                />
                                {errors.confirmPassword &&
                                    <p className="error-text">{errors.confirmPassword.message}</p>}
                            </label>


                            <Button className="" type="submit" color="primary">save</Button>
                            <div className="error-text">{errorText}</div>
                            <p>Do you already have an account? Log in <Link to="/login">here</Link></p>
                        </div>

                    </div>
                </form>


            </>
        )

}
export default CreateAccount;
