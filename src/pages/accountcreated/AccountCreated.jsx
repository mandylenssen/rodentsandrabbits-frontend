import './AccountCreated.css'
import {Link, NavLink} from "react-router-dom";
import Button from "../../components/button/Button.jsx";

function AccountCreated() {
    return (

            <section className="account-created-section outer-container">
                <div className="white-text inner-container">
                    <h8>You have successfully created an account!</h8>
                    <NavLink to="/login">
                        <Button type="button" color="primary">Read More</Button>
                    </NavLink>

                </div>
            </section>

    )
}

export default AccountCreated;
