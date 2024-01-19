import './Login.css'
import {Link, useNavigate} from "react-router-dom";
import Button from "../../components/button/Button.jsx";
import {useContext} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";

function Login() {

    const {login} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Simulate an asynchronous login process (replace with actual login logic)
        try {
            await login();
            // If login is successful, navigate to the home page
            navigate('/');
        } catch (error) {
            console.error('Login error:', error.message);
            // Handle login error
        }
    };

    return (
        <>

            <div className="outer-login-container outer-container">
                <div className="inner-container">
                    <h3>Login</h3>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="email-field">
                            <h4>Email address</h4>
                            <input type="email" id="email-field" placeholder="Enter your email" required />
                        </label>

                        <label htmlFor="password-field">
                            <h4>Password</h4>
                            <input type="password" id="password-field" placeholder="Enter your password" required />
                        </label>

                        <h5><Link to="/forgotpassword">Forgot your password?</Link></h5>

                        <Button type="submit">Login</Button>

                        <h5>Don't have an account yet? Sign up <Link to="/createaccount">here</Link></h5>
                    </form>
                </div>
            </div>
            );


            {/*<div className="outer-login-container outer-container">*/}
            {/*    <div className="inner-container">*/}
            {/*<h3>Login</h3>*/}
            {/*        <label htmlFor={}*/}
            {/*<h4>email address</h4>*/}
            {/*<h4>password</h4>*/}
            {/*<h5>forgot your password?</h5>*/}
            {/*<button>Login</button>*/}
            {/*<h5>Don't have an account yet? Sign up <Link to="/createaccount">here</Link></h5>*/}
            {/*    </div></div>*/}

        </>
    )
}

export default Login;
