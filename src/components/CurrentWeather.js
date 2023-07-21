import React from 'react';
import '../../src/assets/styles/CurrentWeather.css';

const CurrentWeather = ({ weatherInfo }) => {
  return (
    <div className="Current__Weather">
      <div className='City__Name'>
        <p>{weatherInfo.name.toUpperCase()}</p>
      </div>
      <div className="Weather__Data">
        <div className="wi">
          <div className={`wi-icon-${weatherInfo.weather[0].id} Weather__Icon`}>
          </div>
        </div>
        <p className="Temperature__Max">
          {Math.round(weatherInfo.main.temp_max)}
          <sup className="temperature__symbol">°</sup>
        </p>
      </div>
    </div>
    )
}

export default CurrentWeather;