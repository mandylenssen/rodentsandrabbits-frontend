import "./Home.css"
import gerbil from "../../assets/gerbil-photo-1.png"
import bunny from "../../assets/bunny-photo-frontpage.png"
import jumpingBunny from "../../assets/jumping-rabbit-white.png"
import {NavLink} from "react-router-dom";
import Button from "../../components/button/Button.jsx";

function Home() {
    return (
        <main>
            <header className="top-article-container outer-container">
                <div className="inner-container">
                    <article className="home-article-container">
                        <div className="home-article-photo">
                            <img className="home-photo-top home-photos" src={gerbil} alt="Picture of a gerbil" width="375"
                                 height="489"/>
                        </div>

                        <div className="article__text-container">
                            <div className="header-text-container">
                            <h3>Cozy Hideaway for</h3>
                            <h3>Your Tiny Companions!</h3></div>
                            <p>Welcome to our cozy haven for small wonders! At Rodents & Rabbits, we specialize in
                                providing a home away from home for your beloved rodents and rabbits. Nestled in a haven of comfort and care,
                                our facility is designed to ensure a stress-free and enjoyable experience for your tiny companions.</p>

                            <NavLink to="/petboarding">
                                <Button type="button" color="secondary">Read More</Button>
                            </NavLink>

                        </div>
                    </article>
                </div>
            </header>

            <section className="center-text-container outer-container">
                <div className="narrow-inner-container inner-container">
                    <h2>Hoppy Holidays! Nestled in comfort, your tiny pals are in
                        good paws while you're away.</h2>
                        <h2>Enjoy your break, and know that in our cozy haven, the little squeaks and binkies never
                        stop!</h2>
                </div>
            </section>
            <section className="bottom-article-container outer-container">
                <div className="inner-container">
                    <article className="home-article-container">
                        <div className="article__text-container">
                            <img className="animal-icon" src={jumpingBunny} alt="jumping-bunny-icon"/>

                            <div className="header-text-container"><h3>Enjoy your holiday!</h3></div>
                            <p>Prepare for your holiday with peace of mind! Secure your pet's spot at Rodents & Rabbits
                                by
                                making a
                                reservation today. While you enjoy your well-deserved break, your furry friend will be
                                in the
                                caring
                                hands of our dedicated team. Book now for a worry-free getaway and ensure your pet's own
                                vacation is
                                just as fantastic as yours!</p>
                            <NavLink to="/bookings">
                                <Button type="button" color="primary">Book now</Button>
                            </NavLink>
                        </div>


                        <div className="home-article-photo">
                            <img className="home-photo-bottom home-photos" src={bunny} alt="Picture of 2 bunnies" width="375"
                                 height="489"/>
                        </div>
                    </article>
                </div>
            </section>
        </main>
    )
}

export default Home;
