import './LoginRequired.css'
import {Link} from "react-router-dom";

function LoginRequired() {
    return (
      <section className="login-required-section outer-container">
          <div className="green-text inner-container">
              <h3>In order to view this page you need to be logged in.</h3>
              <h3>Click <Link to="/login">here</Link> to log in or create an account.</h3>
          </div>
      </section>
    )
}

export default LoginRequired;
