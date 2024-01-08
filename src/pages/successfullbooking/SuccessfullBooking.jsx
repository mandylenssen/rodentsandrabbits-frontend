import './SuccessfullBooking.css'
import {NavLink} from "react-router-dom";
import Button from "../../components/button/Button.jsx";

function SuccessfullBooking() {
    return (

        <section className="successfull-booking-section outer-container">
            <div className="yellow-text inner-container">
                <h8>Your booking has been successfully confirmed!</h8>
                <NavLink to="/mybookings">
                    <Button type="button" color="primary">My bookings</Button>
                </NavLink>

            </div>
        </section>
    )
}

export default SuccessfullBooking;
