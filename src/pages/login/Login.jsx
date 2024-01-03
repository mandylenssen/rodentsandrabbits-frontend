import './Login.css'
import {Link} from "react-router-dom";

function Login() {
    return (
        <>
            <h3>Login</h3>
            <h4>email address</h4>
            <h4>password</h4>
            <h5>forgot your password?</h5>
            <button>Login</button>
            <h5>Don't have an account yet? Sign up <Link to="/createaccount">here</Link></h5>

        </>
    )
}

export default Login;
