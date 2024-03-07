import "./Navigation.css"
import {NavLink, useNavigate} from "react-router-dom";
import RRlogoGreen from "../../assets/RR-logo-green.png";
import Button from "../button/Button.jsx";
import {useContext, useState} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";

function Navigation() {

    const navigate = useNavigate();
    const {isAuth, logout, isAdmin} = useContext(AuthContext);

    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleDropdownToggle = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleMouseEnter = () => {
        setDropdownOpen(true);
    };

    const handleMouseLeave = () => {
        setDropdownOpen(false);
    };

    const isActiveLink = ({isActive}) => isActive ? "active-link" : "default-link";

    return (
        <header className="outer-container main-navigation">
            <nav className="inner-nav-container">
                <ul className="main-navigation-links">
                    <li><NavLink to="/" className={isActiveLink}>Home</NavLink></li>
                    <li><NavLink to="/petboarding" className={isActiveLink}> Pet boarding</NavLink></li>
                    <li><Button type="button" color="invisible" onClick={() => navigate("/")}>
                        <img src={RRlogoGreen} alt="Logo that links to home page"/> </Button></li>
                    <li><NavLink to="/bookings" className={isActiveLink}>Bookings</NavLink>
                    </li>
                    {isAuth && (
                        <li
                            className="dropdown-container"
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}>

                            <NavLink className={isActiveLink} onClick={handleDropdownToggle} to="/">
                                <span className="my-account-text">{isAdmin() ? "Admin" : "My Account"}</span>
                            </NavLink>
                            {dropdownOpen && (
                                <div className="dropdown-content">
                                    <ul>
                                        {isAdmin() ? (
                                            <>
                                                <li>
                                                    <NavLink to="/bookingmanager" className={isActiveLink}>booking manager</NavLink>
                                                </li>
                                                <li><NavLink to="/logbookmanager" className={isActiveLink}>logbook manager</NavLink></li>
                                            </>
                                        ) : (
                                            <>
                                                <li>
                                                    <NavLink to="/mypets" className={isActiveLink}>My Pets</NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to="/mybookings" className={isActiveLink}>My Bookings</NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to="/logbook" className={isActiveLink}>logbook</NavLink>
                                                </li>
                                            </>
                                        )}
                                        <li>
                                            <NavLink to="/logout" className={isActiveLink} onClick={logout}>log out</NavLink>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </li>
                    )}
                    {!isAuth && (
                        <li>
                            <NavLink to="/login" className={isActiveLink} onClick={() => navigate("/login")}>
                                Login
                            </NavLink>
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    );
}

export default Navigation;
