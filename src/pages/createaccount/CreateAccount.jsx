import './CreateAccount.css'
import {Link} from "react-router-dom";
import {useForm} from "react-hook-form";
import Button from "../../components/button/Button.jsx";

function CreateAccount() {

    const {register} = useForm();

    return (
        <>

            <form className="create-account-container outer-container">
                <div className="inner-container">
                    <h3>Create your Account</h3>
                    <label htmlFor="firstname-field">
                        first name
                        <input
                            type="text"
                            name="firstname"
                            id="firstname-field"
                        />
                    </label>

                    <label htmlFor="lastname-field">
                    last name
                    <input
                        type="text"
                        name="lastname"
                        id="lastname-field"
                    />
                </label>

                    <label htmlFor="phonenumber-field">
                        phone number
                        <input
                            type="tel"
                            name="phonenumber"
                            id="phonenumber-field"
                        />
                    </label>

                    <label htmlFor="email-field">
                        email address
                        <input
                            type="text"
                            name="email"
                            id="email-field"
                        />
                    </label>

                    <label htmlFor="password-field">
                        password
                        <input
                            type="password"
                            name="password"
                            id="password-field"
                        />
                    </label>

                    <label htmlFor="password-field">
                        password
                        <input
                            type="password"
                            name="password"
                            id="password-field"
                        />
                    </label>

                    <Button className="" type="submit" color="tertiary">save</Button>

                </div>
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
