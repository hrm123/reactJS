import { rest } from 'msw'

import axios from "axios";
import {  APIS_URL } from "./config";
import MsftTimeSeries from './MSFT.json'

const axiosService = axios.create({
    baseURL: APIS_URL,
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36',
        'Referer': 'https://www.nasdaq.com'
}
});

export const handlers = [
    rest.post('/timeseries', (req, res, ctx) => {
      // Persist user's authentication in the session
      sessionStorage.setItem('is-authenticated', 'true')
  
      return res(
        // Respond with a 200 status code
        ctx.status(200),
      )
    }),
  
    rest.get('/timeseries', (req, res, ctx) => {
      
        let args = {}  // .replace("timeseries?url=","").replace("/data.json","");
        // console.log({search: req.url.searchParams}, {url: req.url})
        for (const [key, value] of req.url.searchParams) {
            // console.log(key, value)
            args[key] = value
        }
        
        const {code, token}  = args
        // console.log({args})
        const urlFull = `${APIS_URL}/${code}/data.json?api_key=${token}`;

        return  res(
          ctx.status(200),
          ctx.json(MsftTimeSeries),
        )

        /*
        return fetch(urlFull).then(async (timeSeries) => {
            console.log({timeSeries})
            const timeSeriesJson = await timeSeries.json()
            })
            */

  
      // If authenticated, return a mocked user details
      
    }),
  ]