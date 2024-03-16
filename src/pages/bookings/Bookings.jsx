import "./Bookings.css"
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

function Bookings() {

    // Gebruik van de AuthContext om te controleren of een gebruiker is ingelogd
    const {isAuth} = useContext(AuthContext);
    const jwtToken = localStorage.getItem("token");
    const navigate = useNavigate();

    // State voor het bijhouden van niet-beschikbare datums en boekingsfouten
    const [unavailableDates, setUnavailableDates] = useState([]);
    const {pets} = useFetchPets(jwtToken);
    const [bookingError, setBookingError] = useState("");
    const animatedComponents = makeAnimated();

    // useForm hook voor formulierbeheer
    const [formData, setFormData] = useState({
        petIDs: [],
        dateRange: [null, null],
        info: ""
    });

    const {
        handleSubmit,
        control,
        setError,
        formState: {errors},
    } = useForm({mode: "onBlur"});

    // useEffect hook om niet-beschikbare datums op te halen bij component mount
    useEffect(() => {
        async function fetchUnavailableDates() {
            try {
                const response = await axios.get("http://localhost:8080/bookings/unavailable-dates", {
                    headers: {
                        "Authorization": `Bearer ${jwtToken}`
                    }
                });
                setUnavailableDates(response.data.map(dateStr => new Date(dateStr)));
            } catch (error) {
                console.error("Error fetching unavailable dates:", error);
                setBookingError("Server did not respond. Please try again later.");
            }
        }
        // Haal niet-beschikbare datums alleen op als de gebruiker is ingelogd
        if (isAuth) {
            fetchUnavailableDates();
        }
    }, [isAuth, jwtToken]);

    // Voorbereiden van opties voor het Select component gebaseerd op opgehaalde huisdieren
    const petOptions = pets.map(pet => ({value: pet.id, label: pet.name}));

    // Functie om de boeking op te slaan in de database bij het verzenden van het formulier
    async function handleFormSubmit(data) {
        if (!data.petIDs || data.petIDs.length === 0) {
            setError("petIDs", { type: "manual", message: "Selecting at least one pet is required." });
            return;
        // Voorkomt dat het formulier wordt ingediend als er geen huisdier is geselecteerd.
        }
        // Stuur een POST-verzoek naar de backend om de boeking op te slaan in de database
        try {
            await axios.post("http://localhost:8080/bookings", {
                startDate: data.dateRange[0],
                endDate: data.dateRange[1],
                additionalInfo: data.info,
                petIds: data.petIDs
            }, {
                headers: {
                    "Authorization": `Bearer ${jwtToken}`,
                    "Content-Type": "application/json"
                }
            });
            navigate("/successfulBooking");
        } catch (error) {
            console.error("Booking error:", error);
            setBookingError("Failed to make the booking. Please try again later.");
        }
    }


    return (
        <>

            <main className="outer-bookings-container outer-container">
                <article className="booking-inner-container">
                    <div className="booking-input-fields-container">
                        <form onSubmit={handleSubmit(handleFormSubmit)}>
                            <h1>Bookings</h1>
                            <p>Making a reservation at Rodents & Rabbits is a breeze! Ensure a cozy retreat for your
                                furry friends by securing their spot with us. Simply follow our user-friendly
                                reservation process,
                                where you can choose dates, customize their stay, and agree to our pet-loving terms
                                and conditions. Your
                                pets are in good hands at Rodents & Rabbits—where comfort meets care.</p>
                            <div className="form-squiggle-image"></div>

                            <h1>Make a reservation</h1>

                            {/*Choose pet dropdown menu*/}
                            <label htmlFor="choose-pet">
                                <p>Pet</p>
                            </label>
                            <Controller
                                name="petIDs"
                                control={control}
                                render={({field}) => (
                                    <Select
                                        {...field}
                                        closeMenuOnSelect={false}
                                        components={animatedComponents}
                                        isMulti
                                        options={petOptions}
                                        onChange={(val) => field.onChange(val.map(item => item.value))}
                                        value={petOptions.filter(option => field.value ? field.value.includes(option.value) : false)}
                                        placeholder="select animal"
                                        styles={{
                                            control: (base) => ({
                                                ...base,
                                                backgroundColor: "var(--color-light-yellow)",
                                                color: "var(--color-green)",
                                                borderRadius: "1.25rem",
                                                padding: "0.5rem",
                                                transition: "all 0.2s ease",
                                                border: "none",
                                                boxShadow: "none",
                                            }),
                                            menu: (base) => ({
                                                ...base,
                                            }),
                                            option: (base, state) => ({
                                                ...base,
                                                backgroundColor: state.isFocused ? "var(--color-purple)" : "var(--color-white)",
                                                color: state.isSelected ? "var(--color-purple)" : "var(--color-green)",
                                                padding: "0.3125rem 1.25rem",
                                                transition: "background-color 0.2s ease",
                                            }),
                                            multiValue: (base) => ({
                                                ...base,
                                                backgroundColor: "var(--color-purple)",
                                            }),
                                            multiValueLabel: (base) => ({
                                                ...base,
                                                color: "var(--color-white)",
                                            }),
                                            placeholder: (base) => ({
                                                ...base,
                                                color: "var(--color-ochre)",
                                            }),

                                        }}
                                    />
                                )}
                            />
                            {errors.petIDs && <p className="error-text">{errors.petIDs.message}</p>}


                            <p className="form-subtext">can't find your pet? please register your pet <Link
                                to="/registerpet">here</Link></p>


                            {/*Choose date range*/}
                            <label htmlFor="choose-date">
                                <p>date</p></label>
                            <div className="datePickerContainer">
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
                                            minDate={new Date()}
                                        />
                                    )}
                                />
                                {errors.dateRange && <p className="error-text">{errors.dateRange.message}</p>}
                            </div>


                            {/*Additional information*/}
                            <label htmlFor="info-field">
                                <p>additional information</p>
                                <Controller
                                    name="info-field"
                                    control={control}
                                    render={({field}) => (
                                        <textarea {...field}
                                                  id="info-field"
                                                  rows="4"
                                                  cols="40"
                                        />
                                    )}
                                />

                            </label>

                            {bookingError && <p className="error-text">{bookingError}</p>}
                            <Button type="submit" color="quaternary">book</Button>

                            <p>By completing this reservation, you acknowledge
                                and agree to abide by our terms and conditions.
                            </p>
                        </form>
                    </div>

                </article>

            </main>
        </>
    )
}

export default Bookings;
