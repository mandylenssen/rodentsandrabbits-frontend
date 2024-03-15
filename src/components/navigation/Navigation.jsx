import "./Navigation.css"
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import RRlogoGreen from "../../assets/RR-logo-green.png";
import Button from "../button/Button.jsx";
import {useContext, useState} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";

function Navigation() {
    const navigate = useNavigate();
    const location = useLocation();
    const {isAuth, logout, isAdmin} = useContext(AuthContext);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);


    // Als de huidige pagina zich onder "My account" begeeft, dan is de link actief
    const isMyAccountRoute = ["/mypets", "/mybookings", "/logbook", "/bookingmanager", "/logbookmanager", "/petmanager"].includes(location.pathname);

    // functie om de zichtbaarheid van de dropdown te toggelen
    const handleDropdownToggle = () => {
        setDropdownOpen(!dropdownOpen);
    };

    // functie om de dropdown te tonen/verbergen wanneer de muis eroverheen gaat
    const handleMouseEnter = () => {
        setDropdownOpen(true);
    };

    const handleMouseLeave = () => {
        setDropdownOpen(false);
    };

    // bepaal de CSS klasse van actieve link zodat deze een andere kleur krijgt
    const isActiveLink = ({isActive}) => isActive ? "active-link" : "default-link";


    return (
        <header className="outer-container main-navigation">
            <button className="sidebar-toggle" onClick={toggleSidebar} aria-label="Toggle menu">
                <span></span>
                <span></span>
                <span></span>
            </button>
            <div className="logo-container">
                <Button type="button" color="invisible" onClick={() => navigate("/")}>
                    <img src={RRlogoGreen} alt="Logo that links to home page"/>
                </Button>
            </div>
            {isSidebarOpen && (
                <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
                    <button className="close-sidebar" onClick={toggleSidebar}>X</button>
                    <ul>
                        <li><NavLink to="/" onClick={toggleSidebar}>Home</NavLink></li>
                        <li><NavLink to="/petboarding" onClick={toggleSidebar}>Pet boarding</NavLink></li>
                        <li><NavLink to="/bookings" onClick={toggleSidebar}>Bookings</NavLink></li>
                        {isAuth && (
                            <>
                                {!isAdmin() && ( // Voor niet-admins
                                    <>
                                        <li><NavLink to="/mypets" onClick={toggleSidebar}>My Pets</NavLink></li>
                                        <li><NavLink to="/mybookings" onClick={toggleSidebar}>My Bookings</NavLink></li>
                                        <li><NavLink to="/logbook" onClick={toggleSidebar}>Logbook</NavLink></li>
                                    </>
                                )}
                                {isAdmin() && ( // Voor admins
                                    <>
                                        <li><NavLink to="/bookingmanager" onClick={toggleSidebar}>Booking Manager</NavLink></li>
                                        <li><NavLink to="/logbookmanager" onClick={toggleSidebar}>Logbook Manager</NavLink></li>
                                        <li><NavLink to="/petmanager" onClick={toggleSidebar}>Pet Manager</NavLink></li>
                                    </>
                                )}
                                <li><NavLink to="/logout" className="login-logout-button" onClick={() => {
                                    logout();
                                    toggleSidebar();
                                }}>Logout</NavLink></li>
                            </>
                        )}
                        {!isAuth && (
                            <li><NavLink to="/login" className="login-logout-button" onClick={toggleSidebar}>Login</NavLink></li>
                        )}
                    </ul>
                </div>
            )}


    <nav className="inner-nav-container">
        <ul className="main-navigation-links">
            <li><NavLink to="/" className={isActiveLink} end>Home</NavLink></li>
            <li><NavLink to="/petboarding" className={isActiveLink}>Pet boarding</NavLink></li>
            <li><Button type="button" color="invisible" onClick={() => navigate("/")}>
                <img src={RRlogoGreen} alt="Logo that links to home page"/> </Button></li>
            <li><NavLink to="/bookings" className={isActiveLink}>Bookings</NavLink>
            </li>
            {isAuth && (
                <li className="dropdown-container" onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}>
                    <button className={`my-account-text ${isMyAccountRoute ? "active-link" : ""}`}
                            onClick={handleDropdownToggle}>
                        {isAdmin() ? "Admin" : "My Account"}
                    </button>
                    {dropdownOpen && (
                        <div className="dropdown-content">
                            <ul>
                                {isAdmin() ? (
                                    <>
                                        <li><NavLink to="/bookingmanager" className={isActiveLink}>booking
                                            manager</NavLink></li>
                                        <li><NavLink to="/logbookmanager" className={isActiveLink}>logbook
                                            manager</NavLink></li>
                                        <li><NavLink to="/petmanager" className={isActiveLink}>pet
                                            manager</NavLink></li>
                                    </>
                                ) : (
                                    <>
                                        <li><NavLink to="/mypets" className={isActiveLink}>My Pets</NavLink>
                                        </li>
                                        <li><NavLink to="/mybookings" className={isActiveLink}>My
                                            Bookings</NavLink></li>
                                        <li><NavLink to="/logbook" className={isActiveLink}>logbook</NavLink>
                                        </li>
                                    </>
                                )}
                                <li>
                                    <NavLink to="/logout" className={isActiveLink} onClick={logout}>log
                                        out</NavLink>
                                </li>
                            </ul>
                        </div>
                    )}
                </li>
            )}
            {!isAuth && (
                <li>
                    <NavLink to="/login" className={isActiveLink}>Login</NavLink>
                </li>
            )}
        </ul>
    </nav>
</header>
)
    ;
}

export default Navigation;
