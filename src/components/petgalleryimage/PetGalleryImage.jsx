import React, {useRef} from 'react';
import './PetGalleryImage.css';
import useFetchPetImage from '../../hooks/useFetchPetImage';

function PetGalleryImage({pet}) {
    const {petImageUrl, isLoading, error} = useFetchPetImage(pet);
    const imageRef = useRef(null);

    const scrollToPetCard = () => {
        const petCard = document.getElementById(`petcard-${pet.id}`);
        if (petCard) {
            petCard.scrollIntoView({behavior: 'smooth', block: 'start'}); // Scroll naar bovenkant van de petCard
        }
    };

    if (isLoading) return <p>Loading image...</p>;
    if (error) return <p>Error loading image: {error.message}</p>;

    return (
        <figure className="pet-image-wrapper" onClick={scrollToPetCard} ref={imageRef}>
            <img className="pet-profile-image" src={petImageUrl} alt={`Profile of ${pet.name}`}/>
            <figcaption className="pet-name-overlay">{pet.name}</figcaption>
        </figure>
    );
}

export default PetGalleryImage;
