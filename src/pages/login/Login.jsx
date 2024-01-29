import './Login.css'
import {Link, useLocation, useNavigate} from "react-router-dom";
import Button from "../../components/button/Button.jsx";
import {useContext, useEffect} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";
import {useForm} from "react-hook-form";
import axios from "axios";

function Login() {

    const {login} = useContext(AuthContext);
    const location = useLocation();
    const successMessage = location.state?.successMessage;
    const source = axios.CancelToken.source();

    const {
        handleSubmit,
        register,
        formState: {errors},
    } = useForm({mode: 'onSubmit'});

    useEffect(() => {
        return function cleanup() {
            //         source.cancel();
        }
    }, []);


    async function handleFormSubmit(data) {
        try {
            const result = await axios.post(`http://localhost:8080/authenticate`, {
                username: data.email,
                password: data.password,
            }, {
                cancelToken: source.token,
            });
            console.log(result.data.jwt)
            login(result.data.jwt);

        } catch (error) {
            console.error('Authentication error:', error.response?.data || error.message);
        }

    }


    return (
        <>
            <div className="outer-login-container outer-container">
                <div className="inner-container">
                    {successMessage && <p>{successMessage}</p>}
                    <h3>Login</h3>
                    <form onSubmit={handleSubmit(handleFormSubmit)}>
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
                                {...register('password', {required: 'Password is required'})}
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
