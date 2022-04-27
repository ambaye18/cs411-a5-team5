import React from 'react';

// just a placeholder for now, will pass search results for weather into here to display
export default function WeatherResult(props) {
  return (
      <div className='weather-result'>
        <div className='weather-result-img'>
          <img src={props.weather.icon} alt="weather" />
        </div>
        <div className='weather-result-info'>
          <h3>{props.weather.description}</h3>
          <h3>{props.main.temp}</h3>
        </div>
      </div>
  );
}