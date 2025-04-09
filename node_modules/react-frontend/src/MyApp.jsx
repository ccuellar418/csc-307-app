import React, { useState } from "react";
import Table from "./Table";

// const characters = [
//     {
//         name: "Charlie",
//         job: "Janitor"
//     },
//     {
//         name: "Mac",
//         job: "Bouncer"
//     },
//     {
//         name: "Dee",
//         job: "Aspring actress"
//     },
//     {
//         name: "Dennis",
//         job: "Bartender"
//     }
// ];

function MyApp() {
    const [characters, setCharacters] = useState([
        {
            name: "Charlie",
            job: "Janitor"
        },
        {
            name: "Mac",
            job: "Bouncer"
        },
        {
            name: "Dee",
            job: "Aspring actress"
        },
        {
            name: "Dennis",
            job: "Bartender"
        }
    ]);

    function removeOneCharacter(index) {
        const updated = characters.filter((character, i) => {
            return i !== index;
        });
        setCharacters(updated);
    }

    return (
        <div className="container">
            <Table 
                characterData={characters} 
                removeCharacter={removeOneCharacter}
            /> 
             {/* that call to table basically just calls the function and lets table do its own thing */} 
        </div>
    );
}
export default MyApp;