import "./NotFound.css"
import Status from "../../components/status/Status.jsx";

function NotFound() {
    return (
        <Status
            text="Sorry, the page you were looking for does not exist."
            navLink="/"
            navButtonText="return home"
        >
        </Status>


    )
}

export default NotFound;
