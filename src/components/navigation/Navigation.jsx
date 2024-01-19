import './Navigation.css'
import {NavLink, useNavigate} from "react-router-dom";
import RRlogoGreen from '../../assets/RR-logo-green.png';
import Button from "../button/Button.jsx";
import {useContext} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";

function Navigation() {

    const navigate = useNavigate();
    const {isAuth, logout} = useContext(AuthContext);

    return (
        <nav className="main-navigation outer-container">
            <div className="inner-nav-container">
            <ul className="main-navigation-links">
                <li>
                    <NavLink to="/" className={({isActive}) => isActive === true ? 'active-link' : 'default-link'}>
                        Home</NavLink>
                </li>
                <li>
                    <NavLink to="/petboarding" className={({isActive}) => isActive === true ? 'active-link' : 'default-link'}>
                        Pet boarding</NavLink>
                </li>
            <li>
                    <Button type="button" color="invisible" onClick={() => navigate('/')}>
                    <img src={RRlogoGreen} alt="Logo that links to home page"/>
                </Button>
            </li>
                <li>
                    <NavLink to="/bookings" className={({isActive}) => isActive === true ? 'active-link' : 'default-link'}>
                        Bookings</NavLink>
                </li>
                {isAuth ?
                    <li>
                        <NavLink to="/logout" className={({isActive}) => isActive === true ? 'active-link' : 'default-link'} onClick={logout}>
                            Log out</NavLink>
                    </li>
                :
                <li>
                    <NavLink to="/login" className={({isActive}) => isActive === true ? 'active-link' : 'default-link'} onClick={() => navigate('/login')} >
                        Login</NavLink>
                </li>}


            </ul>
            </div>
            </nav>

    )
}

export default Navigation;
