import { useCallback, useEffect, useState } from 'react';
import cities from './json/cities-fr.json';
import { WeatherService } from './services/WeatherService';
import Loader from './components/Loader'
import WeatherAndForecast from './components/WeatherAndForecast';
import './assets/styles/App.css'
function App() {
  const frenchCities = cities;

  const [activeCity, setActiveCity] = useState(cities[0]);
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getWeatherData = useCallback(async () => {
    const weatherService = new WeatherService();
    setIsLoading(true);
    await weatherService.getWeatherInfo(activeCity.lat, activeCity.lon).then((data) => {
      setWeatherData(data);
      setIsLoading(false);
    }, (err) => {
      setIsLoading(false);
    });
  }, [activeCity])

  useEffect(() => {
    getWeatherData();
  }, [activeCity, getWeatherData]);







  const getSelectedCityData = (id) => {
    return frenchCities.find(item => item.id === id)
  };

  const cityChangedHandler = (e) => {
    if (!!e.target.value) {
      const currentCity = getSelectedCityData(Number(e.target.value));
      setActiveCity(currentCity);
    }
  };


  return (
    <div className='App'>
      <div className="App__container">
        <div className="Search__Form">
          <label>Select City</label>
          <select onChange={cityChangedHandler}>
            {frenchCities.map(item => {
              return <option value={item.id} key={item.id}>{item.nm}</option>
            })}
          </select>
        </div>
          {isLoading && (
            <Loader />
          )}
        <div>
          {(!isLoading && !!weatherData) && (
            <WeatherAndForecast weatherData={weatherData} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
