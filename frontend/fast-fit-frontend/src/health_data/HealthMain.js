import React, { useEffect, useState } from "react"
import format from "date-fns/format"
import { useToken } from '../Authentication'
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
  const [healthData, setHealthData] = useState({
    username: "",
    current_weight: 0,
    current_bmi: 0.0
  })

  const [token] = useToken()
  const [weightHistory, setWeightHistory] = useState([])

  const fetchUserWeight = async () => {
    const tokenUrl = `${process.env.REACT_APP_ACCOUNTS_HOST}/token`
    const tokenResponse = await fetch(tokenUrl, { credentials: "include", })
    if (tokenResponse.status === 200) {
      const { token } = await tokenResponse.json()
      const url = `${process.env.REACT_APP_HEALTH_HOST}/api/health_data/user`
      const healthResponse = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (healthResponse.ok) {
        const weightHistory = await healthResponse.json()
        setWeightHistory(weightHistory)
      }
    }
  }

  // useEffect(() => {
  //   // console.log(“recipe: change”, recipe)
  //   setMeal({
  //     ...meal,
  //     recipe_api_id: recipe.uri.split(‘#’)[1],
  //     type: type
  //   })
  // }, [recipe])

  const handleChange = event => {
    const value = event.target.value
    const numericValue = parseInt(value)
    setHealthData({ ...healthData, current_weight: numericValue })
  }

  const handleSubmit = async event => {
    event.preventDefault()
    const url = `${process.env.REACT_APP_HEALTH_HOST}/api/health_data`
    try {
      const response = await fetch(url, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(healthData)
      })
      if (response.ok) {
        setHealthData({ ...healthData, current_weight: 0 })
        fetchUserWeight()
      }
    }
    catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    fetchUserWeight()
  }, [token]);

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
    datasets: [{
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
    <div className="w-screen py-4">
      <div className="flex items-center justify-center">
        <div className="grid-col-row-2">
          <div className="w-full bg-[#C7e8f3] shadow-xl rounded-lg">
            <div className="grid-col-row-2">
              <div className="px-6 py-4 rounded-lg shadow-xl">
                <div className="grid-col-row-2 bg-[#f1f1f1] rounded-md">
                  <h1 className="text-center font-semibold text-2xl py-3">Weight History</h1>
                  <div className="flex flex-row gap-6 items-center justify-center py-2">
                    <form>
                      <label className="px-4">
                        Weight:
                        <input onChange={handleChange} type="number" step="1" name="weight" placeholder="0" value={healthData.current_weight} />
                      </label>
                      <button
                        onClick={handleSubmit}
                        type="button"
                        className="p-2 bg-[#bf9aca] btn rounded font-bold text-[#f1f1f1]" >
                        Submit
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-[800px] bg-[#C7e8f3] shadow-xl rounded-lg">
            <div className="grid-col-row-2 mt-10">
              <div className="px-6 py-4 rounded-lg shadow-xl">
                <div className="grid-col-row-2 bg-[#f1f1f1] rounded-md">
                  <div className="flex flex-row gap-6 items-center justify-center py-2">
                    <Line className="px-5 bg-[#F1F1F1]" data={data} height={90} type="line" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
