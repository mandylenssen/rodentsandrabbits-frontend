import './MyPets.css'
import {NavLink} from "react-router-dom";
import Button from "../../components/button/Button.jsx";

function MyPets() {
    return (
        <>
            <section className="mypets-outer-container outer-container">
                <div className="inner-container">
            <h3>You haven't registered a pet yet</h3>
            <NavLink to="/registerpet">
                <Button type="button" color="secondary">Register Pet</Button>
            </NavLink>


            <h3>My Pets</h3>



            <button>logbook</button>

            <h3>Naam dier / ophalen</h3>
            <p>date of birth</p>
            <p>species</p>
            <p>gender</p>
            <p>medication</p>
            <p>special notes</p>
            <p>diet notes</p>

            <button>edit pet</button>
                </div></section>
        </>
    )
}

export default MyPets;
