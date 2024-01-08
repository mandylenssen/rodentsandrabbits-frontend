import './NotFound.css'
import {Link} from "react-router-dom";

function NotFound() {
    return (
        <section className="not-found-section outer-container">
            <div className="green-text inner-container">
            <h3>Sorry, the page you were looking for does not exist.</h3>
            <h3>Click <Link to="/">here</Link> to return to the home page.</h3>
            </div>
        </section>
    )
}

export default NotFound;
