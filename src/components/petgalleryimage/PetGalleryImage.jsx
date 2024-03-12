import React from 'react';
import './PetGalleryImage.css';
import useFetchPetImage from '../../hooks/useFetchPetImage';

function PetGalleryImage({ pet }) {
    const { petImageUrl, isLoading, error } = useFetchPetImage(pet);

    if (isLoading) return <p>Loading image...</p>;
    if (error) return <p>Error loading image.</p>;

    return (
        <div className="pet-image-wrapper">
            <img className="pet-profile-image" src={petImageUrl} alt={`Profile of ${pet.name}`} />
            <div className="pet-name-overlay">{pet.name}</div>
        </div>
    );
}

export default PetGalleryImage;
