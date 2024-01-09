import './Footer.css'
import {useNavigate} from 'react-router-dom';
import RRfooterLogo from '../../assets/Logo-met-muis.png';

function Footer() {

    return (
        <footer className="outer-container">
            <div className="inner-container">
                <div className="footer-wrapper">

                    <div className="footer-logo-container">
                        <img className="footer-logo" src={RRfooterLogo} alt="Rabbits & Rodents logo"/>
                    </div>

                    <div className="footer-text footer__contact-container">
                        <h5>Contact</h5>
                        <p>Langestraat 10</p>
                        <p>7294AH Heerlen</p>
                        <p> 045-93749284</p>
                        <p>info@rabbitsandrodents.nl</p>
                    </div>

                    <div className="footer-text footer__times-container">
                        <h5>Pick-up and Drop-off Times</h5>
                        <p>Weekdays:</p>
                        <p>Drop-off between 10:00AM and 10:30AM</p>
                        <p>Pick-up between 5:00PM and 5:30PM</p>
                        <p>Weekend:</p>
                        <p>Drop-off & Pick-up between 10:00AM and 11:00AM</p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;