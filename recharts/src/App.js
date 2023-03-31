import { useEffect, useState } from "react";
import Chart from "./barChart";
import Chart1 from "./barChart1";
import Chart2 from "./barChart2";



export default function App() {
  const [data, setdata] = useState();

  useEffect(() => {
    const fetchDatas = async () => {
      const res = await fetch("https://api.coincap.io/v2/assets/?limit=20");
      const data = await res.json();
      console.log(data);
      setdata(data?.data);
    };
    fetchDatas();
  }, []);

  return <div className="App graphgrid">
    <div className="graphrow">
      <Chart data={data} layout='horizontal'/>
    </div>
    <div className="graphrow">
      <Chart1 />
    </div>
    <div className="graphrow">
      <Chart2 />
    </div>

    
    </div>;
}