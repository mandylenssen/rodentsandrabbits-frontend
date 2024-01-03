import './CreateAccount.css'
import {Link} from "react-router-dom";

function CreateAccount() {
    return (
        <>
            <h3>Create your Account</h3>
            <h4>first name</h4>
            <h4>last name</h4>
            <h4>phone number</h4>
            <h4>email address</h4>
            <h4>password</h4>
            <h4>password</h4>

            <button>Register</button>
            <h5>Do you already have an account? Log in <Link to="/login">here</Link></h5>
        </>
    )
}

export default CreateAccount;
