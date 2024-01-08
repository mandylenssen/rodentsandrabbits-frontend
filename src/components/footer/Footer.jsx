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
                        <h9>Langestraat 10<br/>
                            7294AH Heerlen<br/>
                            045-93749284
                            info@rabbitsandrodents.nl
                        </h9>

                    </div>

                    <div className="footer-text footer__times-container">
                        <h5 className="ochre-text">Pick-up and Drop-off Times</h5>
                        <h9>Weekdays:<br/>
                            Drop-off between 10:00AM and 10:30AM<br/>
                            Pick-up between 5:00PM and 5:30PM<br/></h9>
                            <br/>
                            <h9>Weekend:<br/>
                            Drop-off & Pick-up between 10:00AM and 11:00AM
                        </h9>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;