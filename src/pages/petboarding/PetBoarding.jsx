import './PetBoarding.css'
import bunny from "../../assets/bunny-photo-petboarding.png";
import gerbil from "../../assets/gerbil-photo-2.png";
import mouse from "../../assets/mouse-icon.png";
import standingBunny from "../../assets/standing-rabbit-white.png";

function PetBoarding() {
    return (
        <>
            <section className="petboarding-top-container outer-container">
                <div className="inner-container pet-boarding-text">
                    <h3>Pet boarding</h3>
                    <p>Welcome to our Rabbits & Rodents Pet Boarding - a cozy haven where your furry friends can enjoy a
                        home
                        away from home. We understand that your rabbits and rodents are not just pets; they're beloved
                        members
                        of your family. That's why we've created a warm and secure environment where they can thrive in
                        your
                        absence.</p>

                    <p>Our boarding facility is designed with the comfort and well-being of rabbits and rodents in mind.
                        Each
                        spacious enclosure is equipped with cozy bedding, enriching toys, and a familiar environment to
                        make
                        them feel at ease. Our dedicated and trained staff ensures that your pets receive the
                        personalized care,
                        attention, and love they deserve during their stay.</p>

                    <p>Feeding routines mirror your home schedule, with a selection of high-quality pellets, fresh hay,
                        and
                        occasional treats. We take pride in maintaining a clean and hygienic space, ensuring the health
                        and
                        happiness of your cherished companions.</p>

                    <p>Whether you're away for a short trip or an extended vacation, you can trust Rabbits & Rodents Pet
                        Boarding to provide a safe and nurturing place for your pets. Stay worry-free, knowing that your
                        furry
                        friends are in capable hands, receiving the utmost care and affection throughout their stay with
                        us.
                        Because at Rabbits & Rodents Pet Boarding, we believe every pet deserves a vacation too!</p>

                    <img className="animal-icon" src={mouse} alt="mouse-icon"/>

                </div>
            </section>

            <img className="pet-boarding-photo" src={gerbil} alt="Picture of a gerbil"/>

            <section className="petboarding-bottom-container outer-container">
                <div className="inner-container pet-boarding-text">

                    <img className="animal-icon" src={standingBunny} alt="standing-bunny-icon"/>

                    <p>At Rabbits & Rodents Pet Boarding, we understand that each furry friend has unique preferences
                        and
                        comforts, and we happily welcome you to bring your pet's familiar surroundings with them! If
                        your rabbit
                        or rodent has a favorite cage that they feel secure in, you are more than welcome to bring it
                        along for
                        their stay.</p>

                    <p>We believe in providing a home-like environment for your pets, and bringing their own cage
                        ensures a
                        seamless transition into their temporary abode. Just let us know in advance about the dimensions
                        and any
                        specific requirements your pet's cage may have, and our accommodating staff will make sure
                        everything is
                        set up just the way your pet likes it.</p>

                    <p>Your pet's well-being and comfort are our top priorities. By bringing their own cage, you help
                        create a
                        sense of familiarity, reducing stress and ensuring a happy and content stay. Rest assured, our
                        team will
                        take every measure to integrate your pet's cage seamlessly into our boarding facilities,
                        maintaining a
                        clean, hygienic, and secure environment.</p>

                    <p>At Rabbits & Rodents Pet Boarding, we strive to make your pet's experience as close to home as
                        possible.
                        Feel free to bring along their cherished cage, and let us take care of the rest, providing a
                        loving and
                        tailored experience for your furry companion throughout their stay with us.</p>
                </div>


            </section>
            <img className="pet-boarding-photo" src={bunny} alt="Picture of a bunny"/>

        </>
    )
}

export default PetBoarding;
