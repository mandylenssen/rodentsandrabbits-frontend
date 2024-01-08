import './LoginRequired.css'
import {Link} from "react-router-dom";

function LoginRequired() {
    return (
      <section className="login-required-section outer-container">
          <div className="green-text inner-container">
              <h8>In order to view this page you need to be logged in.</h8>
              <h8>Click <Link to="/login">here</Link> to log in or create an account.</h8>
          </div>
      </section>
    )
}

export default LoginRequired;
