import axios from "axios";
import {  APIS_URL } from "./config";

const axiosService = axios.create({
    baseURL: 'http://localhost:3000',
    /* --cannot set these headers since there is error
    headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36',
            'Referer': 'https://www.nasdaq.com'
    }
    */
});

export function fetcherAV(url, params) {
    return axiosService.get(`${url}${params || ''}&function=TIME_SERIES_DAILY&outputsize=compact&api_key=${process.env.REACT_APP_API_KEY}`).then((res) => res.data);
}

export function fetcher(url, params) {
    const {code, token} = url.args

    return axiosService.get(`/timeseries?code=${code}&token=${token}`);
}
export default axiosService;