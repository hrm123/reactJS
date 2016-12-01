import axios from 'axios';

const API_KEY_OPENWEATHERMAP_ORG='471bd59a5dcdc25cee7484205138f518';
const ROOT_URL = `http://api.openweathermap.org/data/2.5/forecast?appid=${API_KEY_OPENWEATHERMAP_ORG}`;

export const FETCH_WEATHER = 'FETCH_WEATHER';

export function fetchWeather(cityName){
    const url = `${ROOT_URL}&q=${cityName},us`;
    const request = axios.get(url);
    return{
        type: FETCH_WEATHER,
        payload: request
    };
}