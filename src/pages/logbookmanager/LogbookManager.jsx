import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useForm, Controller} from "react-hook-form";
import Select from "react-select";
import makeAnimated from "react-select/animated";

function LogbookManager() {
    const {control, handleSubmit, setValue} = useForm();
    const [pets, setPets] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');

    // 1. check welke pets er op dit moment aanwezig zijn
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





    async function onSubmit(data) {

        // check of er pets zijn geselecteerd
        if (data.petIDs.length === 0) {
            console.error("No pets selected.");
            return;
        }
        // haal de eigenaar op
        const firstPetId = data.petIDs[0].value;
        try {
            const owner = await axios.get(`http://localhost:8080/pets/${firstPetId}/owner`, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            });
            const ownerUsername = owner.data;

            // logbook id ophalen
            const logbookIdResponse = await axios.get(`http://localhost:8080/logbooks/user/${ownerUsername}/id`, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            });
            const logbookId = logbookIdResponse.data;
            console.log("logbookid:" + logbookId);

            // logboek toevoegen
            const logbook = {
                entry: data.entry,
                date: new Date().toISOString(),
                petsIds: data.petIDs.map(pet => pet.value)
            };

            await axios.post(`http://localhost:8080/logbooks/${logbookId}/logs`, logbook, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                }
            });
            console.log(logbook);
            setSuccessMessage('Log added successfully');
            setTimeout(() => setSuccessMessage(''), 3000);
            setValue('petIDs', []);
        } catch (error) {
            console.error('Failed to add log:', error.response ? error.response.data : error);
        }

    };

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

                    <button type="submit">Add Log</button>
                </form>
                {successMessage && <div className="success-message">{successMessage}</div>}
            </div>
        );
    }

export default LogbookManager;
