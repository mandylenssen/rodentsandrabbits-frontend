import './MyPets.css'
import {NavLink} from "react-router-dom";
import Button from "../../components/button/Button.jsx";
import {useEffect, useState} from "react";
import axios from "axios";


function MyPets() {

    const [pets, setPets] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchPets() {
           try { const response = await axios.get('http://localhost:8080/pets');
               setPets(response.data);
            console.log(response.data);
            setLoading(false);
        } catch(error) {
            console.log(error);
           }
        }
        fetchPets();

    }, []);


    return (
        <>
            <section className="mypets-outer-container outer-container">
                <div className="inner-container">
                    {loading ? (<p>Loading...</p>) : pets.length === 0 ? (

                        <div>
                            <h3>You haven't registered a pet yet</h3>

            <NavLink to="/registerpet">
                <Button type="button" color="secondary">Register Pet</Button>
            </NavLink></div>
        ) : (

                       <div>
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
                           <NavLink to="/registerpet">
                               <Button type="button" color="secondary">Register Pet</Button>
                           </NavLink>
                        </div>

                        )}
                </div>
        </section>
</>
);
}

export default MyPets;
