import React from 'react'

const DisplayCountry = ({ country }) => {
  return (
    <div>
      <h2>{country.name}</h2>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>

      <h4>languages</h4>
      <ul>
        {country.languages.map(lang => <li key={lang.name} >{lang.name}</li>)}
      </ul>

      <img src={country.flag} alt="flag" width="100px" />
    </div>
  )
}

export default DisplayCountry;