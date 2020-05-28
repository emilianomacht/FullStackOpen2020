import React from "react";
import DisplayCountry from "./DisplayCountry";

const List = ({ countries, filter }) => {
  const filteredCountries = countries.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  if (filteredCountries.length <= 10 && filteredCountries.length > 1) {
    return filteredCountries.map((person) => (
      <p key={person.name}>
        {person.name} {person.number}
      </p>
    ));
  } else if (filteredCountries.length === 1) {
    return <DisplayCountry country={filteredCountries[0]} />
  } else {
    return <p>Too many matches, please specifiy another filter</p>;
  }
};

export default List;
