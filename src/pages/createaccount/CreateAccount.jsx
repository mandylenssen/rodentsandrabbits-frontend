import './CreateAccount.css'
import {useForm} from "react-hook-form";
import Button from "../../components/button/Button.jsx";
import bunny from '../../assets/bunny-photo-create-account-page.png'

function CreateAccount() {

    const {
        handleSubmit,
        formState: {errors},
        register,
    } = useForm({mode: 'onBlur'});


    const phoneNumberPattern = /^[0-9]{10}$/;

    function handleFormSubmit(data) {
        console.log(data);
    }

    return (
        <>

            <form className="create-account-container outer-container" onSubmit={handleSubmit(handleFormSubmit)}>
                {/*<div className="create-account-inner-container inner-container">*/}

                <div className="home-article-photo">
                    <img className="home-photo-top home-photos" src={bunny} alt="Picture of a gerbil" width="375"
                         height="489"/>
                </div>

                <div className="article__text-container">
                    <div className="header-text-container">

                    <h3>Create your Account</h3>
                    <label htmlFor="firstname-field">
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


                    <label htmlFor="firstname-field">
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


                    <label htmlFor="phonenumber-field">
                        <span>phone number*</span>
                        <input
                            type="tel"
                            id="phonenumber-field"
                            {...register("phonenumber", {
                                required: {
                                    value: true,
                                    message: 'phone number is required',
                                },
                                pattern: {
                                    value: phoneNumberPattern,
                                    message: 'Invalid phone number format, please enter 10 digits',
                                },
                            })} />

                        {errors.phonenumber && <p className="error-text">{errors.phonenumber.message}</p>}
                    </label>

                    <label htmlFor="email-field">
                        <span>email address*</span>
                        <input
                            type="email"
                            id="email-field"
                            {...register("email", {
                                required: {
                                    value: true,
                                    message: 'email is required',
                                },
                            })}
                        />
                        {errors.email && <p className="error-text">{errors.email.message}</p>}
                    </label>




                    <label htmlFor="password-field">
                        <span>password*</span>
                        <input
                            type="password"
                            id="password-field1"
                            {...register("password", {
                                required: {
                                    value: true,
                                    message: 'password is required',
                                },
                            })}
                        />
                        {errors.password && <p className="error-text">{errors.password.message}</p>}

                    </label>

                    <label htmlFor="password-field">
                        <span>confirm password*</span>
                        <input
                            type="password"
                            id="password-field2"
                            {...register("password", {
                                required: {
                                    value: true,
                                    message: 'password is required',
                                },
                            })}
                        />
                        {errors.password && <p className="error-text">{errors.password.message}</p>}
                    </label>


                        <Button className="" type="submit" color="tertiary">save</Button>

                    </div></div>

            </form>


            {/*<h4>first name</h4>*/}
            {/*<h4>last name</h4>*/}
            {/*<h4>phone number</h4>*/}
            {/*<h4>email address</h4>*/}
            {/*<h4>password</h4>*/}
            {/*<h4>password</h4>*/}

            {/*<button>Register</button>*/}
            {/*<h5>Do you already have an account? Log in <Link to="/login">here</Link></h5>*/}
        </>
)
}

export default CreateAccount;
