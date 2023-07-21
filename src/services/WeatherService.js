import config from '../config/config.json';

export class WeatherService {
    async getCurrentWeather(lat, lon) {
        return await fetch(`${config.SERVER_URL}weather?lat=${lat}&lon=${lon}&appid=${config.API_KEY}&units=metric`)
    }

    async getForcastData(lat, lon) {
        return await fetch(`${config.SERVER_URL}forecast?lat=${lat}&lon=${lon}&appid=${config.API_KEY}&units=metric`)
    }

    async getWeatherInfo(lat, lon) {
        try {
            const responses = await Promise.all([this.getCurrentWeather(lat, lon), this.getForcastData(lat, lon)]);
            return {
                currentWeather: await responses[0].json(),
                forecast: await responses[1].json()
            }
        } catch (error) {
            throw error;
        }
    }
}
