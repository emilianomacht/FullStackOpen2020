import React from "react";

const Persons = ({ persons, filter, deletePerson }) => {
  return persons
    .filter((person) =>
      person.name.toLowerCase().includes(filter.toLowerCase())
    )
    .map((person) => (
      <p key={person.name}>
        {person.name} {person.number} {" "}
        <button onClick={() => deletePerson(person)} >delete</button>
      </p>
    ));
};

export default Persons;
