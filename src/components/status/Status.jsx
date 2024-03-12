import "./Status.css";
import {NavLink} from "react-router-dom";
import Button from "../../components/button/Button.jsx";

function Status({children, text, navLink, navButtonText = "Button text", showButton = true}) {
    return (
        <section className="status-outer-container outer-container">
            <div className="inner-container">
                <h1>{text}</h1>
                {children}
                {showButton && (
                <NavLink to={navLink}>
                    <Button type="button" color="primary">{navButtonText}</Button>
                </NavLink>)}
            </div>
        </section>
    );
}

export default Status;
