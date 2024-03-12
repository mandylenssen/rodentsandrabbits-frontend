import "./LoginRequired.css"
import Status from "../../components/status/Status.jsx";

function LoginRequired() {
    return (
        <Status
            text="In order to view this page you need to be logged in."
            navLink="/login"
            navButtonText="login"
        >
        </Status>
    )
}

export default LoginRequired;
