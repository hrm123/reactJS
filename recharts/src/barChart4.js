import React from 'react';
import { Bar } from 'react-chartjs-2';


import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
const { faker } = require('@faker-js/faker');

// https://www.chartjs.org/docs/latest/axes/cartesian/#tick-configuration

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  indexAxis: 'y',
  responsive: true,
  // height:10,
  maintainAspectRatio: false,
  aspectRatio: 1,
  // barPercentage: 0.6,
  layout: {
    padding: {right: 40, top: 20},
    autoPadding: false
  },
  plugins: {
    legend: {
      // position: 'right',
      display: false,
    },
    datalabels: {
      anchor: 'end',
      align: 'end',
      display: false,
      textAlign: 'center',
      padding: 4,
    },
    title: {
      display: true,
      text: 'Chart.js Horizontal Bar Chart',
    },
  },
  scales:{
    x:{
      // stacked: true,
      ticks: {display : false},
      grid: {display : false}
    },
    y: {
      // stacked: true,
      grid: {display : false},
      // mirror:true,
      ticks: {
        display: true,
        mirror: true,
        // beginAtZero: true,
        labelOffset: -20, 
        // min: 0, 
        autoSkip: false
      }
    }
  }
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
export const data = {
  labels,
  datasets: [
    {
      // label: 'Dataset 1',
      data: labels.map(() => faker.datatype.number({ min: 100, max: 1000 })),
      // borderColor: 'rgb(255, 99, 132)',
      backgroundColor: labels.map(() => `rgba(255, ${faker.datatype.number({ min: 10, max: 100 })}, 132, 0.5)`),
    },
    /* {
      label: 'Dataset 2',
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    }, */
  ],
};

//height of bar versus labelOffset offset of y-ticks determine placement of bar label text
export function BarChart4() {
  return <Bar options={options} data={data} height={400} />;
}
