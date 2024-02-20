import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useForm, Controller} from "react-hook-form";
import Select from "react-select";
import makeAnimated from "react-select/animated";

function LogbookManager() {
    const {control, handleSubmit, setValue} = useForm();
    const [pets, setPets] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');


    useEffect(() => {

        async function fetchCurrentlyBookedPets() {
            try {
                const response = await axios.get('http://localhost:8080/bookings/currently-present', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    }
                });
                console.log(response.data)
                const petIds = response.data.flatMap(booking => booking.petIds);
                const petDetailsPromises = petIds.map(async (id) => {
                    const petResponse = await axios.get(`http://localhost:8080/pets/${id}`, {
                        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
                    });
                    return petResponse.data;
                });
                const petDetails = await Promise.all(petDetailsPromises);
                const petOptions = petDetails.map(pet => ({value: pet.id, label: pet.name}));

                setPets(petOptions);
            } catch (error) {
                console.error('Error fetching currently booked pets:', error);
            }
        }

        fetchCurrentlyBookedPets();
    }, []);





    // async function onSubmit(data) {
    //     if (data.petIDs.length === 0) {
    //         console.error("No pets selected.");
    //         return;
    //     }
    //     const firstPetId = data.petIDs[0].value;
    //     try {
    //         const owner = await axios.get(`http://localhost:8080/pets/${firstPetId}/owner`, {
    //             headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
    //         });
    //         const ownerUsername = owner.data;
    //
    //         const logbookIdResponse = await axios.get(`http://localhost:8080/logbooks/user/${ownerUsername}/id`, {
    //             headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
    //         });
    //         const logbookId = logbookIdResponse.data;
    //         console.log("logbookid:" + logbookId);
    //
    //         const logbook = {
    //             entry: data.entry,
    //             date: new Date().toISOString(),
    //             petsIds: data.petIDs.map(pet => pet.value)
    //         };
    //
    //         await axios.post(`http://localhost:8080/logbooks/${logbookId}/logs`, logbook, {
    //             headers: {
    //                 'Authorization': `Bearer ${localStorage.getItem('token')}`,
    //                 'Content-Type': 'application/json',
    //             }
    //         });
    //         console.log(logbook);
    //         setSuccessMessage('Log added successfully');
    //         setTimeout(() => setSuccessMessage(''), 3000);
    //         setValue('petIDs', []);
    //     } catch (error) {
    //         console.error('Failed to add log:', error.response ? error.response.data : error);
    //     }
    //
    // };

    async function onSubmit(data) {
        if (data.petIDs.length === 0) {
            console.error("No pets selected.");
            return;
        }

        const firstPetId = data.petIDs[0].value;
        try {
            const ownerResponse = await axios.get(`http://localhost:8080/pets/${firstPetId}/owner`, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            });
            const ownerUsername = ownerResponse.data;

            const logbookIdResponse = await axios.get(`http://localhost:8080/logbooks/user/${ownerUsername}/id`, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            });
            const logbookId = logbookIdResponse.data;

            const logbookData = {
                entry: data.entry,
                date: new Date().toISOString(),
                petsIds: data.petIDs.map(pet => pet.value)
            };

            // Voeg de log entry toe
            const addLogResponse = await axios.post(`http://localhost:8080/logbooks/${logbookId}/logs`, logbookData, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                }
            });

            // Als er een foto is geselecteerd, upload deze dan
            if (data.photo) {
                const formData = new FormData();
                formData.append('file', data.photo);

                // Verkrijg de ID van de nieuw aangemaakte log entry
                const newLogId = addLogResponse.data.id; // Pas dit aan op basis van hoe jouw API de ID teruggeeft

                await axios.post(`http://localhost:8080/logbooks/${logbookId}/logs/${newLogId}/images`, formData, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'multipart/form-data',
                    }
                });
            }

            setSuccessMessage('Log (and photo) added successfully');
            setTimeout(() => setSuccessMessage(''), 3000);
            setValue('petIDs', []);
            setValue('photo', null); // Reset de foto input
        } catch (error) {
            console.error('Failed to add log (or photo):', error.response ? error.response.data : error);
        }
    }



    const animatedComponents = makeAnimated();

        return (
            <div className="outer-container">
                <form className="inner-container" onSubmit={handleSubmit(onSubmit)}>
                    <label htmlFor="entry">Entry:</label>
                    <textarea
                        name="entry"
                        onChange={(e) => setValue('entry', e.target.value)}
                    />
                    <label htmlFor="pets">Select Pets (currently booked):</label>
                    <Controller
                        name="petIDs"
                        control={control}
                        render={({field}) => (
                            <Select
                                {...field}
                                components={animatedComponents}
                                isMulti
                                options={pets}
                                onChange={(val) => field.onChange(val)}
                            />
                        )}
                    />

                    <input type="file" onChange={(e) => setValue('photo', e.target.files[0])} />


                    <button type="submit">Add Log</button>
                </form>
                {successMessage && <div className="success-message">{successMessage}</div>}
            </div>
        );
    }

export default LogbookManager;
