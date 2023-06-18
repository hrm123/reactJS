import useSWR from "swr";
import { fetcher } from "./axios";

const useAlphaVantage = (params) => {
    const token = `${process.env.REACT_APP_API_KEY}`
    const {data, error, isLoading} = useSWR({
            url: `/data.json`,
            args: {code: params.code,  token }
        },
        fetcher,
        /*
        {
            refreshInterval: 200000
        }
        */
    );

      //   console.log('[data, error, isLoading]', [data, error, isLoading])
    
    if(data){
    
        if (data.error) { error = true}

        if (data.data) {
            debugger
            const dataSeries = data.data["dataset_data"].data;

            if (!dataSeries) return null;
            
            let values = []
            dataSeries.map(d => values.push({x: new Date(d[0]), y:[d[1], d[2],d[3],d[4]]}))
            return [values, error, isLoading];
            /*
            data = Object.keys(dataSeries).map(key => {

                const values = Object.values(data[key]);
                values.pop();
                return {
                    x: key,
                    y: values
                };
            });
            */
            
        }
    }

    return [data, error, isLoading];


    

}

export default useAlphaVantage;