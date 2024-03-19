import "./SuccessfulBooking.css"
import Status from "../../components/status/Status.jsx";

function SuccessfulBooking() {
    return (

        <Status
            text="You successfully made a booking!"
            navLink="/mybookings"
            navButtonText="my bookings"
        >
        </Status>

    )
}

export default SuccessfulBooking;
