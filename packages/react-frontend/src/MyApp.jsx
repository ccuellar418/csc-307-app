import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";

function MyApp() {
    const [characters, setCharacters] = useState([]);

    // function removeOneCharacter(index) {
    //     const updated = characters.filter((character, i) => {
    //         return i !== index;
    //     });
    //     setCharacters(updated);
    // }

    function removeOneCharacter(index) {

      fetch(`http://localhost:8000/users/${characters[index].id}`, {
        method: 'DELETE'
      })

      .then((res) => {
        if (res.status === 204) {
          const updated = characters.filter((character, i) => i !== index);
          setCharacters(updated);
        } else if (res.status === 404) {
          console.error("User not in memory/list.");
        } else {
          console.error("Unexpected response: Got ", res.status);
        }
      })
      .catch((err) => console.error("Error deleting user:", err));
    }

    // function updateList(person) {
    //     setCharacters([...characters, person]);
    //   }
    function updateList(person) {
      postUser(person)
        .then((res) => res.json())
        .then((updatedPerson) => setCharacters([...characters, updatedPerson]))
        .catch((error) => {
          console.log(error);
        });
    }

    function fetchUsers() {
      const promise = fetch("http://localhost:8000/users");
      return promise;
    }

    function postUser(person) {
      const promise = fetch("Http://localhost:8000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(person)
      });
      return promise;
    }

    useEffect(() => {
      fetchUsers()
        .then((res) => res.json())
        .then((json) => setCharacters(json["users_list"]))
        .catch((error) => {
          console.log(error);
        });
    }, []);

    return (
        <div className="container">
          <Table
            characterData={characters}
            removeCharacter={removeOneCharacter}
          />
          <Form handleSubmit={updateList} />
        </div>
      );
}
export default MyApp;