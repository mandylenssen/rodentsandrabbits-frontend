import './LogbookLogCard.css';
import React, {useEffect, useState} from "react";
import Button from "../button/Button.jsx";
import {useFetchLogbookID} from "../../hooks/useFetchLogbookID.jsx";
import {usePets} from "../../hooks/usePets.jsx";
import {useFetchLogbookImage} from "../../hooks/useFetchLogbookImage.js";

function LogbookLogCard() {
    const jwtToken = localStorage.getItem("token");
    const {logbookEntries, loading, error} = useFetchLogbookID(jwtToken);
    const petIds = logbookEntries.logs.flatMap(log => log.petsIds);
    const pets = usePets(petIds, jwtToken);
    const imageUrls = useFetchLogbookImage(logbookEntries, jwtToken);
    const [visibleEntries, setVisibleEntries] = useState([]);


    useEffect(() => {
        setVisibleEntries(logbookEntries.logs.slice(0, 3));
    }, [logbookEntries.logs]);

    const handleLoadMore = () => {
        setVisibleEntries(logbookEntries.logs.slice(0, visibleEntries.length + 3));
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;


    return (
        <main className="logbook-card-inner-container">
            {visibleEntries && visibleEntries.length > 0 ? (
                <>
                    {visibleEntries.map((log, index) => (
                        <article key={index} className="logbook-card-wrapper">
                            <div className="logbook-name-date-label">
                                <p><b>{log.petsIds.map(petId => pets[petId]?.name || "Unknown Pet").join(", ")}</b></p>
                                <time dateTime={log.date}>{new Date(log.date).toLocaleDateString()}</time>
                            </div>
                            <div className="logbook-card-content">
                                <div className="logbook-image-wrapper">
                                    {imageUrls[log.id] &&
                                        <img className="logbook-image" src={imageUrls[log.id]} alt="Log"/>}
                                </div>
                                <p>{log.entry}</p>
                            </div>
                            <div className="logbook-squiggle-image"></div>
                        </article>
                    ))}
                    {visibleEntries.length < logbookEntries.logs.length && (
                        <Button color="quaternary" onClick={handleLoadMore}>Load More</Button>
                    )}
                </>
            ) : (
                <p>No logbook entries found.</p>
            )}
        </main>
    );

}

export default LogbookLogCard;