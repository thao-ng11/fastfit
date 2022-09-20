import React, { useState, useEffect } from "react";
import WorkoutEntry2 from "./WorkoutEntry2";
import { useToken } from "../Authentication";
import { useNavigate } from "react-router-dom";

function WorkoutPlanList() {
  const [token] = useToken();
  // console.log(token)
  const [workouts, setWorkouts] = useState([]);
  const navigate = useNavigate();
  const [dateFilter, setDateFilter] = useState("");
  const fetchWorkouts = async () => {
    const strengthWorkoutstUrl =
      "http://localhost:8020/api/strength_workout/user";
    const cardioWorkoutsUrl = "http://localhost:8020/api/cardio_workout/user";
    const response = await fetch(strengthWorkoutstUrl, {
      credentials: "include",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const response2 = await fetch(cardioWorkoutsUrl, {
      credentials: "include",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    const data2 = await response2.json();
    console.log(data);
    const allData = data.concat(data2);
    setWorkouts(allData);
  };
  useEffect(() => {
    fetchWorkouts();
  }, [token]);

  const cancelWorkout = async (id, type) => {
    const cancelUrl = `http://localhost:8020/api/${type}/${id}/`;
    const fetchConfig = {
      method: "delete",
    };
    const cancelResponse = await fetch(cancelUrl, fetchConfig);
    if (cancelResponse.ok) {
      let updatedworkouts = [];
      updatedworkouts = workouts.filter((workout) => workout.id !== id);
      setWorkouts(updatedworkouts);
    }
  };
  function filterDates(e) {
    setDateFilter(e.target.value);
  }
  function handleNavigate() {
    navigate("/workout");
  }
  return (
    <div className="flex justify-between items-center overflow-y-auto  max-h-[225px]">
      <div className="w-full bg-[#c7e8f3] rounded-lg">
        <table className="table-auto object-cover table-borderless">
          <thead></thead>
          <tbody className="pt-5">
            {workouts.map((workout) => {
              if (workout.workout_date.includes(dateFilter)) {
                return (
                  <WorkoutEntry2
                    className="hover:bg-gray-300"
                    workout={workout}
                  />
                );
              }
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default WorkoutPlanList;
