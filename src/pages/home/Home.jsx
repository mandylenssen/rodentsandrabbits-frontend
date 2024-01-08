import './Home.css'
import gerbil from '../../assets/gerbil-photo-1.png'
import bunny from '../../assets/bunny-photo-frontpage.png'
import jumpingBunny from '../../assets/jumping-rabbit-white.png'
import {NavLink} from "react-router-dom";
import Button from "../../components/button/Button.jsx";

function Home() {
    return (
        <main>
            <header className="yellow-container outer-container">
                <div className="inner-container">
                    <article className="article-container">
                        <div className="article-photo">
                            <img className="home-photo-top" src={gerbil} alt="Picture of a gerbil" width="375"
                                 height="489"/>
                        </div>

                        <div className="article__text-container">
                            <h1>Cozy Hideaway for<br/> Your Tiny Companions!</h1>
                            <p>Welcome to our cozy haven for small wonders! At Rodents & Rabbits, we specialize in
                                providing
                                a
                                home away
                                from home for your beloved rodents and rabbits. Nestled in a haven of comfort and care,
                                our
                                facility is
                                designed to ensure a stress-free and enjoyable experience for your tiny companions.</p>

                            <NavLink to="/petboarding">
                                <Button type="button" color="secondary">Read More</Button>
                            </NavLink>

                        </div>
                    </article>
                </div>
            </header>

            <section className="ochre-container outer-container">
                <div className="narrow-inner-container inner-container">
                    <h2><span className="black-text">Hoppy Holidays!</span> Nestled in comfort, your tiny pals are in
                        good paws while you're away.<br/>
                        Enjoy your break, and know that in our cozy haven, the little squeaks and binkies never
                        stop!</h2>
                </div>
            </section>
            <section className="green-purple-container outer-container">
                <div className="inner-container">
                    <article className="article-container">
                        <div className="article__text-container">
                            <img className="bunny-icon" src={jumpingBunny} alt="jumping-bunny-icon"/>

                            <span className="white-text"><h1>Enjoy your holiday!</h1>
                            <p>Prepare for your holiday with peace of mind! Secure your pet's spot at Rodents & Rabbits
                                by
                                making a
                                reservation today. While you enjoy your well-deserved break, your furry friend will be
                                in the
                                caring
                                hands of our dedicated team. Book now for a worry-free getaway and ensure your pet's own
                                vacation is
                                just as fantastic as yours!</p></span>
                            <NavLink to="/bookings">
                                <Button type="button" color="primary">Book now</Button>
                            </NavLink>
                        </div>


                        <div className="article-photo">
                            <img className="home-photo-bottom" src={bunny} alt="Picture of a gerbil" width="375"
                                 height="489"/>
                        </div>
                    </article>
                </div>
            </section>
        </main>
    )
}

export default Home;
