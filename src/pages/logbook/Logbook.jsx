import React from "react";
import "./Logbook.css";
import LogbookLogCard from "../../components/logbooklogcard/LogbookLogCard.jsx";

function Logbook() {

    return (
            <main className="logbook-outer-container outer-container">
                <div className="inner-container">
                        <h1>Logbook</h1>
                        <LogbookLogCard/>
                </div>
            </main>
    );

}

export default Logbook;
