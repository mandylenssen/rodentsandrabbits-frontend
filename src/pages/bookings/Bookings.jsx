import './Bookings.css'
import {Link, useNavigate} from "react-router-dom";
import React, {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";
import {Controller, useForm} from "react-hook-form";
import Button from "../../components/button/Button.jsx";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {useFetchPets} from "../../hooks/useFetchPets.jsx";
import axios from "axios";
import makeAnimated from "react-select/animated";
import Select from "react-select";

function Bookings(callback) {

    const {
        handleSubmit,
        control,
        formState: {errors},
        register,
        watch,
    } = useForm({mode: 'onBlur'});

    const {isAuth} = useContext(AuthContext);
    const jwtToken = localStorage.getItem('token');
    const navigate = useNavigate();
    const [selectedPets, setSelectedPets] = useState([]);
    const [unavailableDates, setUnavailableDates] = useState([]);
    const { pets, loading, error } = useFetchPets(jwtToken);
    const [bookingError, setBookingError] = useState('');

    useEffect(() => {
        // Fetch unavailable dates when the component mounts
        const fetchUnavailableDates = async () => {
            try {
                const response = await axios.get('http://localhost:8080/bookings/unavailable-dates', {
                    headers: {
                        'Authorization': `Bearer ${jwtToken}`
                    }
                });
                setUnavailableDates(response.data.map(dateStr => new Date(dateStr)));
            } catch (error) {
                console.error('Error fetching unavailable dates:', error);
            }
        };

        if (isAuth) {
            fetchUnavailableDates();
        }
    }, [isAuth, jwtToken]);

    const petOptions = pets.map(pet => ({ value: pet.id, label: pet.name }));

    async function handleFormSubmit(data) {
        try {
            await axios.post('http://localhost:8080/bookings', {
                startDate: data.dateRange[0],
                endDate: data.dateRange[1],
                additionalInfo: data.info,
                petIds: selectedPets.map(pet => pet.value)
            }, {
                headers: {
                    'Authorization': `Bearer ${jwtToken}`,
                    'Content-Type': 'application/json'
                }
            });
            navigate('/successfullbooking');
        } catch (error) {
            console.error('Booking error:', error);
            setBookingError('Failed to make the booking. Please try again later.');
        }
    }

    const animatedComponents = makeAnimated();

    //
    // const petOptions = pets.map(pet => ({ value: pet.id, label: pet.name }));
    //
    //
    // const handlePetSelectionChange = (selectedOptions) => {
    //     setSelectedPets(selectedOptions || []);
    // };
    //
    // const animatedComponents = makeAnimated();
    //


    // async function handleFormSubmit(data) {
    //     console.log(data);
    // }

    // async function handleFormSubmit(data) {
    //     try {
    //         await axios.post('http://localhost:8080/bookings', {
    //             startDate: data.dateRange[0],
    //             endDate:data.dateRange[1],
    //             additionalInfo: data.info,
    //             petIds: data.pets
    //         }, {
    //             headers: {
    //                 'Authorization': `Bearer ${jwtToken}`,
    //                 'Content-Type': 'application/json'
    //             }
    //         });
    //         console.log(data)
    //         navigate('/successfullbooking');
    //     } catch (error) {
    //         console.error('Booking error:', error);
    //         setBookingError('Failed to make the booking. Please try again later.');
    //         console.log(data)
    //     }
    //     }
    //
    //


    return (
        <>

        <div className="outer-bookings-container outer-container">
            <div className="inner-container">
            {isAuth ?
                <form onSubmit={handleSubmit(handleFormSubmit)}>
                        <h3>Bookings</h3>
                        <p>Making a reservation at Rodents & Rabbits is a breeze! Ensure a cozy retreat for your
                            furry
                            friends by
                            securing their spot with us. Simply follow our user-friendly reservation process, where
                            you can
                            choose
                            dates, customize their stay, and agree to our pet-loving terms and conditions. Your pets
                            are in
                            good hands
                            at Rodents & Rabbits—where comfort meets care.</p>


                        <label htmlFor="choose-pet">
                            <p>Pet</p>
                        </label>

                        <Controller
                            name="pets"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    closeMenuOnSelect={false}
                                    components={animatedComponents}
                                    isMulti
                                    options={petOptions}
                                    onChange={(val) => field.onChange(val.map(item => item.value))}
                                    value={petOptions.filter(option => field.value ? field.value.includes(option.value) : false)}
                                />

                            )}
                        />

                        {/*<Select*/}
                        {/*    id="choose-pet"*/}
                        {/*    isMulti*/}
                        {/*    options={petOptions}*/}
                        {/*    classNamePrefix="select"*/}
                        {/*    onChange={handleChange}*/}
                        {/*    isLoading={loading}*/}
                        {/*    value={selectedPets}*/}
                        {/*/>*/}
                        {/*{errors.pets && <p className="error-text">{errors.pets.message}</p>}*/}




                        <label htmlFor="choose-date">
                            <p>date</p></label>
                        <Controller
                            control={control}
                            name="dateRange"
                            rules={{required: "Date range is required"}}
                            render={({field}) => (
                                <DatePicker
                                    selectsRange
                                    startDate={field.value?.[0]}
                                    endDate={field.value?.[1]}
                                    onChange={(date) => field.onChange(date)}
                                    dateFormat="MM/dd/yyyy"
                                    excludeDates={unavailableDates}
                                />
                            )}
                        />
                        {errors.dateRange && <p className="error-text">{errors.dateRange.message}</p>}


                        <label htmlFor="info-field">
                            <p>additional information</p>
                            <textarea
                                id="info-field"
                                rows="4"
                                cols="40"
                                {...register("info")}>
                        </textarea>
                        </label>

                        <Button type="submit" color="quaternary">book</Button>

                        <p>By completing this reservation, you acknowledge
                            and agree to abide by our terms and conditions.
                        </p>
                    </form>
                :
                <div>
                    <h3>In order to view this page, you need to be logged in.</h3>
                    <h3>Click <Link to="/login">here</Link> to log in or create an account.
                    </h3></div>

            }




        </div></div>
            </>
            )
}

export default Bookings;
