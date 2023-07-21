import '../../src/assets/styles/Forecast.css';

const Forecast =({forecast})=> {
    return(
    <div className="Forecast_Day">
       <div className="wi">
          <div className={`wi-icon-${forecast.forecast.weather[0].id} Forecast__Icon` }>
          </div>
        </div>
        <p className="temperature__max">
        {Math.round(forecast.forecast.main.temp_min)}
          <sup className="temperature__symbol">°</sup>
        </p>
        <p className="temperature__max">
        {Math.round(forecast.forecast.main.temp_max)}
          <sup className="temperature__symbol">°</sup>
        </p>
    </div>
    )
}

export default Forecast;

