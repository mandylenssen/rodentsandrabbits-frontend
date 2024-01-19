import './Login.css'
import {Link, useNavigate} from "react-router-dom";
import Button from "../../components/button/Button.jsx";
import {useContext} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";
import {useForm} from "react-hook-form";

function Login() {

    const {login} = useContext(AuthContext);
    const navigate = useNavigate();

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm({mode: 'onSubmit'});


    const onSubmit = async (data) => {
        try {
            await login(data);
            navigate('/');
        } catch (error) {
            console.error('Login error:', error.message);
        }
    };

    return (
        <>
            <div className="outer-login-container outer-container">
                <div className="inner-container">
                    <h3>Login</h3>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <label htmlFor="email-field">
                            <h4>Email address</h4>
                            <input
                                type="email"
                                id="email-field"
                                placeholder="Enter your email"
                                {...register('email', {
                                    required: 'Email is required',
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                        message: 'Invalid email address',
                                    },
                                })}
                            />
                        </label>
                        {errors.email && <p className="error-text">{errors.email.message}</p>}

                        <label htmlFor="password-field">
                            <h4>Password</h4>
                            <input
                                type="password"
                                id="password-field"
                                placeholder="Enter your password"
                                {...register('password', { required: 'Password is required' })}
                            />
                        </label>
                        {errors.password && <p className="error-text">{errors.password.message}</p>}

                        <h5>
                            <Link to="/forgotpassword">Forgot your password?</Link>
                        </h5>

                        <Button type="submit">Login</Button>

                        <h5>
                            Don't have an account yet? Sign up <Link to="/createaccount">here</Link>
                        </h5>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login;
