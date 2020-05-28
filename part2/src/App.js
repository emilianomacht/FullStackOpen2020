import React, { useState, useEffect } from "react";
import axios from "axios";

import Filter from "./components/Filter";
import List from "./components/List";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");
  const [countriesToDisplay, setCountriesToDisplay] = useState({});

  useEffect(() => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then((response) => {
        // console.log('response.data', response.data)
        setCountries(response.data);
    });
  }, []);

  const handleFilter = (event) => {
    const newFilter = event.target.value;

    setFilter(newFilter);
    setCountriesToDisplay(
      countries
        .filter((country) =>
          country.name.toLowerCase().includes(newFilter.toLowerCase())
    ));
  };

  const showSingleCountry = (event) => {
    // console.log('event.target.name', event.target.name)
    setCountriesToDisplay(
      countries.filter(country => event.target.name === country.name)
    );
  }

  return (
    <div>
      <h2>Data for countries</h2>

      <Filter handleFilter={handleFilter} filter={filter} />

      <List countries={countriesToDisplay} showSingleCountry={showSingleCountry} />
    </div>
  );
};

export default App;
