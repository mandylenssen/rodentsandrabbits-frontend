import "./LogOut.css";
import Status from "../../components/status/Status.jsx";

function LogOut() {

    return (
        <Status
            text="You successfully logged out"
            showButton={false}
        >
        </Status>
    );
}

export default LogOut;