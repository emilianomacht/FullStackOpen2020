import React, { useState, useEffect } from "react";
// import axios from "axios";
import "./index.css";

import personService from "./services/persons";

import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";
// import notes from "./services/notes";

const App = () => {
  // const [persons, setPersons] = useState([
  //   { name: "Arto Hellas", number: "040-123456" },
  //   { name: "Ada Lovelace", number: "39-44-5323523" },
  //   { name: "Dan Abramov", number: "12-43-234345" },
  //   { name: "Mary Poppendieck", number: "39-23-6423122" },
  // ]);

  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [isNotificationSuccesful, setIsNotificationSuccesful] = useState(true);

  useEffect(() => {
    personService.getAll().then((response) => {
      setPersons(response.data);
    });
  }, []);

  const handleNewName = (event) => {
    setNewName(event.target.value);
  };

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilter = (event) => {
    setFilter(event.target.value);
  };

  const updatePerson = () => {
    const personToUpdate = persons.find((person) => person.name === newName);
    personService
      .update(personToUpdate.id, { name: newName, number: newNumber })
      .then(
        setPersons(
          persons.map((person) =>
            person.id === personToUpdate.id
              ? { name: newName, number: newNumber }
              : person
          )
        )
      )
      .catch(() => {
        setNotificationMessage(
          `${personToUpdate.name} has been removed from server. Please reload the page.`
        );
        setIsNotificationSuccesful(false);
      });
  };

  const addPerson = (event) => {
    event.preventDefault();

    if (newName === "" || newNumber === "") {
      return;
    }

    if (persons.some((person) => person.name === newName)) {
      // alert(`${newName} is already added to phonebook`);
      window.confirm(
        `${newName} is already on phonebook. Replace old number with new one?`
      ) && updatePerson();
    } else {
      // setPersons(persons.concat({ name: newName, number: newNumber }));
      personService
        .create({
          name: newName,
          number: newNumber,
        })
        .then((response) => {
          setPersons(persons.concat(response.data));
          setNewName("");
          setNewNumber("");
          setNotificationMessage(`Added ${response.data.name}`);
          setIsNotificationSuccesful(true);
          setTimeout(() => {
            setNotificationMessage(null);
          }, 5000);
        })
        .catch((error) => {
          const errors = error.response.data.errors;
          let errorString = '';
          for (let errorProp in errors) {
            errorString += errors[errorProp].properties.message + " ";
          }
          setNotificationMessage(`${errorString}`);
          setIsNotificationSuccesful(false);
          setTimeout(() => {
            setNotificationMessage(null);
          }, 5000);
        });
    }
  };

  const deletePerson = (personToDelete) => {
    if (!window.confirm(`Delete ${personToDelete.name}?`)) return;

    personService
      .remove(personToDelete.id)
      .then(
        setPersons(persons.filter((person) => person.id !== personToDelete.id))
      );
  };

  return (
    <div>
      <h2>Phonebook - Full</h2>

      <Filter handleFilter={handleFilter} filter={filter} />

      <h3>Add new person</h3>

      <Notification
        message={notificationMessage}
        isSuccesful={isNotificationSuccesful}
      />

      <PersonForm
        addPerson={addPerson}
        handleNewName={handleNewName}
        newName={newName}
        handleNewNumber={handleNewNumber}
        newNumber={newNumber}
      />

      <h3>Numbers</h3>

      <Persons persons={persons} filter={filter} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
