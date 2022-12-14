import React, { useEffect, useState } from "react";
import format from "date-fns/format";
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
} from "chart.js";
import { Line } from "react-chartjs-2";

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

export default function WeightWidget() {
  const [healthData, setHealthData] = useState({
    username: "",
    current_weight: 0,
    current_bmi: 0.0,
  });

  const [weightHistory, setWeightHistory] = useState([]);

  const fetchUserWeight = async () => {
    const tokenUrl = `${process.env.REACT_APP_ACCOUNTS_HOST}/token`;
    const tokenResponse = await fetch(tokenUrl, { credentials: "include" });
    if (tokenResponse.status === 200) {
      const { token } = await tokenResponse.json();
      const url = `${process.env.REACT_APP_HEALTH_HOST}/api/health_data/user`;
      const healthResponse = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (healthResponse.ok) {
        const weightHistory = await healthResponse.json();
        setWeightHistory(weightHistory);
      }
    }
  };

  // const handleChange = event => {
  //   const value = event.target.value
  //   setHealthData({...healthData, current_weight:value})
  // }

  useEffect(() => {
    fetchUserWeight();
  }, []);

  let labels = [];
  let weights = [];

  weightHistory &&
    weightHistory.map((weight) => {
      const date = format(new Date(weight.entry_date), "MM/dd");
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
      <div className="w-full h-full">
        <Line className="bg-[#F1F1F1]" data={data} height={90} type="line" />
      </div>
    </>
  );
}
