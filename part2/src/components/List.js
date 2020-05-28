import React from "react";
import DisplayCountry from "./DisplayCountry";

const List = ({ countries, showSingleCountry }) => {
  if (countries.length <= 10 && countries.length > 1) {
    return countries.map((country) => (
      <div key={country.name} >
        {country.name} {country.number}
        <button onClick={showSingleCountry} name={country.name} >show</button>
      </div>
    ));
  } else if (countries.length === 1) {
    return <DisplayCountry country={countries[0]} />;
  } else {
    return <p>Too many matches, please specifiy another filter</p>;
  }
};

export default List;
