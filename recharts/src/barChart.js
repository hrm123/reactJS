import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
  } from "recharts";
  
  export default function Chart({ data, layout }) {
    return (
      <ResponsiveContainer width="100%" height={400} >
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          layout={layout}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="name" fill="#8884d8" />
          <Bar dataKey="priceUsd" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    );
  }