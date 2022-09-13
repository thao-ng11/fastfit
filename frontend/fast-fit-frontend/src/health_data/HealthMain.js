import React, { useEffect, useState } from "react"
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
  const [user_weights, setuser_weights] = useState([])
  const fetchUserWeight = async () => {

    const url = `${process.env.REACT_APP_HEALTH_HOST}/api/health_data/user`

    const healthResponse = await fetch(url, {
      // headers: { Authorization: `Bearer ${token}` },
    });

    if (healthResponse.ok) {
      const user_weights = await healthResponse.json()
      console.log(user_weights)
      
      }
    }

  useEffect(() => {
    fetchUserWeight()
  }, []);

  const weightHistory = [
    { current_weight: 180, entry_date: "2022-08-30" },
    { current_weight: 175, entry_date: "2022-08-31" },
    { current_weight: 170, entry_date: "2022-09-21" },
    { current_weight: 180, entry_date: "2022-09-22" },
    { current_weight: 200, entry_date: "2022-09-30" },
    { current_weight: 160, entry_date: "2022-10-22" },
  ]



  let labels = [];
  let weights = [];

  weightHistory &&
    weightHistory.map((weight) => {
      const date = format(new Date(weight.entry_date), "MM/dd/yy");
      labels.push(date);
      weights.push(weight.current_weight);
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
        pointRadius: 3,
        pointHitRadius: 10,
      },
    ],
  };
  return (
    <>
      <div className="bg-[#F1F1F1]">
        <h1 className="p-4">Weight History</h1>
        <div className="p-4">
          <form>
            <label>
              Weight:
              <input type="number" step="0.1" name="weight" />
            </label>
            <input className="p-4" type="submit" value="Submit" />
          </form>
        </div>
      </div>
      <div>
        <Line className="bg-[#F1F1F1]" data={data} height={90} type="line" />
      </div>
    </>
  );
};

