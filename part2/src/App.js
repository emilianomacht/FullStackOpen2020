import React, { useState, useEffect } from "react";
import axios from "axios";

import Filter from "./components/Filter";
import List from "./components/List";

const App = () => {
  // const [persons, setPersons] = useState([
  //   { name: "Arto Hellas", number: "040-123456" },
  //   { name: "Ada Lovelace", number: "39-44-5323523" },
  //   { name: "Dan Abramov", number: "12-43-234345" },
  //   { name: "Mary Poppendieck", number: "39-23-6423122" },
  // ]);

  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then((response) => {
        console.log('response.data', response.data)
        setCountries(response.data);
    });
  }, []);

  const handleFilter = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div>
      <h2>Data for countries</h2>

      <Filter handleFilter={handleFilter} filter={filter} />

      <List countries={countries} filter={filter} />
    </div>
  );
};

export default App;
