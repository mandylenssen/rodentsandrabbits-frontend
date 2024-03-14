import "./LogbookManager.css"
import React, {useState, useEffect} from "react";
import axios from "axios";
import {useForm, Controller} from "react-hook-form";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import Button from "../../components/button/Button.jsx";

function LogbookManager() {
    const {control, handleSubmit, setValue, reset} = useForm();
    const [pets, setPets] = useState([]);
    const [successMessage, setSuccessMessage] = useState("");
    const [fileKey, setFileKey] = useState(Date.now())

    useEffect(() => {

        async function fetchCurrentlyBookedPets() {
            try {
                // hier worden de huisdieren opgehaald die op dit moment aanwezig zijn
                const response = await axios.get("http://localhost:8080/bookings/currently-present", {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    }
                });
                console.log(response.data)
                const petIds = response.data.flatMap(booking => booking.petIds);
                const petDetailsPromises = petIds.map(async (id) => {
                    // hier worden de details van de huisdieren opgehaald a.d.h.v. de huisdier ID
                    const petResponse = await axios.get(`http://localhost:8080/pets/${id}`, {
                        headers: {"Authorization": `Bearer ${localStorage.getItem("token")}`}
                    });
                    return petResponse.data;
                });
                const petDetails = await Promise.all(petDetailsPromises);
                const petOptions = petDetails.map(pet => ({value: pet.id, label: pet.name}));

                setPets(petOptions);
            } catch (error) {
                console.error("Error fetching currently booked pets:", error);
            }
        }

        fetchCurrentlyBookedPets();
    }, []);


    async function onSubmit(data) {
        if (!data.petIDs || data.petIDs.length === 0) {
            console.error("No pets selected.");
            return;
        }

        console.log('Submitted petIDs:', data.petIDs);
        const firstPetId = data.petIDs[0];
        console.log('First pet ID:', firstPetId);
        console.log("test");
        try {

            // hier wordt de eigenaar van het eerste huisdier uit de lijst opgehaald a.d.h.v. het huisdier ID
            const ownerResponse = await axios.get(`http://localhost:8080/pets/${firstPetId}/owner`, {
                headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}
            });
            const ownerUsername = ownerResponse.data;
            console.log('Owner username:', ownerUsername);

            // hier wordt het logbook id opgehaald van de eigenaar van het eerste huisdier a.d.h.v. de eigenaars username
            const logbookIdResponse = await axios.get(`http://localhost:8080/logbooks/user/${ownerUsername}/id`, {
                headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}
            });
            const logbookId = logbookIdResponse.data;
            console.log('Logbook ID:', logbookId);

            const logbookData = {
                entry: data.entry,
                date: new Date().toISOString(),
                petsIds: data.petIDs};
            console.log('Logbook data:', logbookData);

            // hier wordt de log toegevoegd aan het logbook van de eigenaar van het eerste huisdier
            const addLogResponse = await axios.post(`http://localhost:8080/logbooks/${logbookId}/logs`, logbookData, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                }
            });

            const newLogId = addLogResponse.data.id;
            console.log('New log ID:', newLogId);

            if (data.photo) {
                const formData = new FormData();
                formData.append("file", data.photo);

                // hier wordt de foto toegevoegd aan de log van het logbook van de eigenaar van het eerste huisdier
                await axios.post(`http://localhost:8080/logbooks/${logbookId}/logs/${newLogId}/images`, formData, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`,
                        "Content-Type": "multipart/form-data",
                    }
                });
            }

            reset({
                petIDs: [],
                entry: ""
            });
            console.log("Form reset completed");
            setValue("photo", null);
            setFileKey(Date.now());
            setSuccessMessage("Log (and photo) added successfully");
            setTimeout(() => setSuccessMessage(""), 3000);
        } catch (error) {
            console.error("Failed to add log (or photo):", error.response ? error.response.data : error);
        }
    }


    const animatedComponents = makeAnimated();

    return (
        <main className="logbook-manager-outer-container outer-container">
            <form className="logbook-manager-inner-container inner-container" onSubmit={handleSubmit(onSubmit)}>
                <h1>Logbook Manager</h1>

                <label htmlFor="pets">Select Pets (currently booked):</label>
                <Controller
                    name="petIDs"
                    control={control}
                    render={({field}) => (
                        <Select
                            {...field}
                            closeMenuOnSelect={false}
                            components={animatedComponents}
                            isMulti
                            options={pets}
                            onChange={(val) => field.onChange(val.map(item => item.value))}
                            value={pets.filter(option => field.value ? field.value.includes(option.value) : false)}
                            placeholder="select animal"
                            styles={{
                                control: (base) => ({
                                    ...base,
                                    backgroundColor: "var(--color-light-yellow)",
                                    color: "var(--color-green)",
                                    borderRadius: "20px",
                                    padding: "3px",
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
                                    padding: "5px 20px",
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
                        />)}
                />
                <label htmlFor="entry">Entry:</label>
                <Controller
                    name="entry"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <textarea {...field} />
                    )}
                />
                <input type="file" key={fileKey} onChange={(e) => setValue("photo", e.target.files[0])}/>


                <Button color="tertiary" type="submit">save</Button>
                {successMessage && <div className="success-message">{successMessage}</div>}
            </form>

        </main>
    );
}

export default LogbookManager;
