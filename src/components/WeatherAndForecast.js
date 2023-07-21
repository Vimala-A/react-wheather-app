import React, { Fragment, useCallback, useEffect, useState } from 'react';

import CurrentWeather from './CurrentWeather';
import Forecast from './Forecast';
import '../assets/styles/WeatherAndForecast.css';

function WeatherAndForecast({ weatherData }) {
    const [next3DaysForecast, setNext3DaysForecast] = useState([]);

    const buildDate = useCallback((input) => {
        const today = new Date()
        let tomorrow = new Date()
        tomorrow.setDate(today.getDate() + (input + 1));
        const yyyy = tomorrow.getFullYear();
        let mm = tomorrow.getMonth() + 1; // Months start at 0!
        let dd = tomorrow.getDate();
        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;
        const formattedToday = yyyy + '-' + mm + '-' + dd;

        const filterResult = weatherData.forecast.list.filter((item) => {
            return item.dt_txt.substr(0, 10) === formattedToday;
        })
        return filterResult[filterResult.length - 1];
    }, [weatherData]);

    const dateBuilder = useCallback((d) => {
        const days = [
            "SUN",
            "MON",
            "TUE",
            "WED",
            "THU",
            "FRI",
            "SAT"
        ];

        const date = [];
        const currentDay = d.getDay();

        for (let count = 0; count < 3; count++) {
            if (currentDay + count <= 5) {
                date[count] = currentDay + count + 1;
            }
            else if (currentDay + count === 6) {
                date[count] = 0;
            }
            else if (currentDay + count === 7) date[count] = 1;
            else if (currentDay + count === 8) date[count] = 2;
            else if (currentDay + count === 9) date[count] = 3;

        }
        const response = [];
        for (let i = 0; i < date.length; i++) {
            const obj = {
                dayIndex: date[i],
                day: days[date[i]],
                forecast: buildDate(i)
            }
            response.push(obj)
        }
        return response;
    }, [buildDate])

    const buildForecastData = useCallback(() => {
        const next3Days = dateBuilder(new Date());
        return next3Days;
    }, [dateBuilder])

    useEffect(() => {
        setNext3DaysForecast(buildForecastData());
    }, [weatherData, buildForecastData]);
    return (
        <Fragment>
            <CurrentWeather weatherInfo={weatherData.currentWeather} />
            {next3DaysForecast.length > 0 && (
                <Fragment>
                    <div className='Forecast'>
                        {next3DaysForecast.map((item, index) =>
                        (
                            <p key={index}>{item.day}</p>
                        ))}

                    </div>
                    <div className='Forecast__Day'>
                        {next3DaysForecast.map((item, index) =>
                        (
                            <Forecast key={index} forecast={item} />
                        ))}
                    </div>
                </Fragment>
            )
            }
        </Fragment>
    );
}
export default WeatherAndForecast;
