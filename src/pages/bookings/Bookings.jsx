import './Bookings.css'
import {Link, useNavigate} from "react-router-dom";
import React, {useContext} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";
import {Controller, useForm} from "react-hook-form";
import error from "eslint-plugin-react/lib/util/error.js";
import Button from "../../components/button/Button.jsx";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Bookings(callback) {

    const {
        handleSubmit,
        control,
        formState: {errors},
        register,
        watch,
    } = useForm({mode: 'onBlur'});

    const {isAuth} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleFormSubmit = (data) => {
        console.log(data);
    }

    const CustomInput = React.forwardRef(({ value, onClick, placeholder }, ref) => (
        <button className="custom-datepicker-input" onClick={onClick} ref={ref}>
            {value || placeholder}
        </button>
    ));

    return (
        <>



            {isAuth ?
                <form className="outer-bookings-container outer-container" onSubmit={handleSubmit(handleFormSubmit)}>
                    <div className="inner-container">
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
                            <p>Pet</p></label>
                        <select id="choose-pet" {...register("pets", {required: "Please choose a pet"})}
                                defaultValue={watch('pets') || ''}>
                            <option value="" disabled>Select pet</option>
                            <option value="pet1">Pet 1</option>
                            {/* Add more options as needed */}
                        </select>
                        {errors.pets && <p className="error-text">{errors.pets.message}</p>}



                        <label htmlFor="choose-pet">
                            <p>date</p></label>
                        <Controller
                            control={control}
                            name="dateRange"
                            rules={{ required: "Date range is required" }}
                            render={({ field }) => (
                                <DatePicker
                                    selectsRange
                                    startDate={field.value?.[0]}
                                    endDate={field.value?.[1]}
                                    onChange={(date) => field.onChange(date)}
                                    dateFormat="MM/dd/yyyy"
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
                </div>
                </form>
                :
                <div>
                    <h3>In order to view this page, you need to be logged in.</h3>
                        <h3>Click <Link to="/login">here</Link> to log in or create an account.
                    </h3></div>

                }


</>
)
    ;
}

export default Bookings;
