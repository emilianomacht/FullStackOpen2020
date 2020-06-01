import React from "react";

const PersonForm = ({addPerson, handleNewName, newName, handleNewNumber, newNumber}) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input onChange={handleNewName} value={newName} />
      </div>
      <div>
        number: <input onChange={handleNewNumber} value={newNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
