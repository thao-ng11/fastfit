import React from "react"
// import { Line } from "react-chartjs-2";
import format from "date-fns/format"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  ChartOptions
  } from 'chart.js';
  import { Line } from 'react-chartjs-2';

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    TimeScale,
    Title,
    Tooltip,
    Legend
  );

export default function HealthDataForm() {
  const weightHistory = [
    {current_weight: 180, entry_date: "2022-08-30"},
    {current_weight: 175, entry_date: "2022-08-31"},
    {current_weight: 170, entry_date: "2022-09-21"},
    {current_weight: 180, entry_date: "2022-09-22"}
  ]
  
    let labels = [];
    let weights = [];
  
    weightHistory &&
      weightHistory.map((test) => {
        const date = format(new Date(test.entry_date), "MM/dd/yy");
        labels.push(date);
        weights.push("Hello");
      });
    
    const data = {
      labels,
      datasets: [
        {
          label: "Weight",
          data: weights,
          backgroundColor: ["rbga(129, 178, 154, 0.6)"],
          borderWidth: 2,
          lineTension: 0,
          borderDashOffset: 0.0,
          pointBorderColor: "rgba(75,192,192,1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(75,192,192,1",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
        },
      ],
    };
    return <Line data={data} height={90} type="line" />;
}  

