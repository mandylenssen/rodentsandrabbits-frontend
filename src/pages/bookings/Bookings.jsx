import './Bookings.css'
import {Link} from "react-router-dom";
import {useContext} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";

function Bookings() {

    const {isAuth, logout} = useContext(AuthContext);


    return (
        <>

                <div className="outer-container">
                    <div className="inner-container">
                        {isAuth ?
                        <div>
                            <h3>Bookings</h3>
                            <p>Making a reservation at Rodents & Rabbits is a breeze! Ensure a cozy retreat for your
                                furry
                                friends by
                                securing their spot with us. Simply follow our user-friendly reservation process, where
                                you can
                                choose
                                dates, customize their stay, and agree to our pet-loving terms and conditions. Your pets
                                are in
                                good hands
                                at Rodents & Rabbits—where comfort meets care.</p>
                            <h6>pet</h6>
                            <h6>date</h6>
                            <h6>additional information</h6>
                            <button>Send</button>

                            <h9>By completing this reservation, you acknowledge
                                and agree to abide by our terms and conditions.
                            </h9>
                        </div>
                        :
                        <div>
                            <h8>In order to view this page, you need to be logged in.
                                Click <Link to="/login">here</Link> to log in or create an account.
                            </h8>
                        </div>}
                    </div>
                </div>

        </>
    );
}

export default Bookings;
