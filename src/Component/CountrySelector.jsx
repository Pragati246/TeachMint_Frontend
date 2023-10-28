import React, { useState, useEffect } from 'react';

function CountrySelector({ onSelectCountry }) {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    fetch('http://worldtimeapi.org/api/timezone')
      .then(response => response.json())
      .then(data => setCountries(data))
      .catch(error => console.error('Error fetching countries:', error));
  }, []);

  return (
    <select onChange={e => onSelectCountry(e.target.value)}>
      {countries.map((timezone, index) => (
        <option key={index} value={timezone}>
          {timezone}
        </option>
      ))}
    </select>
  );
}

export default CountrySelector;
