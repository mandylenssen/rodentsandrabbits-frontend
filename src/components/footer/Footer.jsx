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
                        <h5 className="ochre-text">Contact</h5>
                        <h6>Langestraat 10</h6>
                        <h6>7294AH Heerlen</h6>
                           <h6> 045-93749284</h6>
                            <h6>info@rabbitsandrodents.nl</h6>

                    </div>

                    <div className="footer-text footer__times-container">
                        <h5 className="ochre-text">Pick-up and Drop-off Times</h5>
                        <h6>Weekdays:</h6>
                            <h6>Drop-off between 10:00AM and 10:30AM</h6>
                        <h6>Pick-up between 5:00PM and 5:30PM</h6>

                            <h6>Weekend:</h6>
                        <h6>Drop-off & Pick-up between 10:00AM and 11:00AM</h6>

                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;