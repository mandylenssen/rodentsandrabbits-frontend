import "./AccountCreated.css"
import Status from "../../components/status/Status.jsx";

function AccountCreated() {

    return (
        <Status
            text="You have successfully created an account!"
            navLink="/login"
            navButtonText="login"
        >
        </Status>

    )
}

export default AccountCreated;
