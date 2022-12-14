import React, { useState, useEffect } from "react";
import CardioWorkoutForm from "./CardioWorkoutsForm";
import StrengthWorkoutForm from "./StrengthWorkoutsForm";
import WorkoutSearchModal from "./WorkoutsearchModal";
import { useNavigate } from "react-router-dom";
import { useToken } from "../Authentication";

function WorkoutPlan() {
  const [token] = useToken();
  const [workoutType, setWorkoutType] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [workouts, setWorkouts] = useState([]);
  const [showWorkoutModal, setShowWorkoutModal] = useState(false);
  const [cardio, setCardio] = useState({
    username: "",
    category: 0,
    workout_date: "2022-08-31",
    workout: "",
    duration: 0,
    distance: 0,
  });
  const [strength, setStrength] = useState({
    username: "",
    category: 0,
    muscle_group: 0,
    workout_date: "2022-08-31",
    workout: "",
    sets: 0,
    repetitions: 0,
    weight: 0,
  });
  const navigate = useNavigate();
  function HandleWorkoutForm() {
    switch (workoutType) {
      case "cardio":
        return (
          <CardioWorkoutForm
            searchTerm={searchTerm}
            HandleCardio={HandleCardio}
            cardio={cardio}
          />
        );
        break;
      case "strength":
      case "powerlifting":
      case "olympic_weightlifting":
      case "strongman":
        return (
          <StrengthWorkoutForm
            searchTerm={searchTerm}
            HandleStrength={HandleStrength}
            strength={strength}
          />
        );
        break;

      default:
        return "";
        break;
    }
  }
  function HandleWorkoutType(e) {
    setWorkoutType(e.target.value);
    if (e.target.value === "cardio") {
      setCardio({ ...cardio, category: e.target.value });
    } else {
      setStrength({ ...strength, category: e.target.value });
    }
    setShowWorkoutModal(true);
  }
  async function handleSumbit() {
    if (workoutType === "cardio") {
      await fetch(`${process.env.REACT_APP_WORKOUTS_HOST}/api/cardio_workout`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(cardio),
      });
    } else {
      console.log(strength);
      await fetch(
        `${process.env.REACT_APP_WORKOUTS_HOST}/api/strength_workout`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(strength),
        }
      );
    }
    navigate("/workout/plan");
  }
  async function HandleSearchInput(e) {
    setSearchTerm(e.target.value);
    setShowModal(true);
    setStrength({ ...strength, muscle_group: e.target.value });
  }
  function HandleClose() {
    setShowModal(false);
  }
  async function fetchWorkouts() {
    let data = await fetch(
      `https://api.api-ninjas.com/v1/exercises?muscle=${searchTerm}`,
      {
        method: "GET",
        headers: { "X-Api-Key": "w+trDWPcrCQuuNR+MYj+Xw==Bk9KDso4mOxNi8CD" },
      }
    );
    data = await data.json();
    setWorkouts(data);
    return data;
  }
  function HandleCardio(e, manual) {
    let key;
    let value;
    if (manual === false) {
      key = e.target.name;
      value = Number(e.target.value);
    } else {
      key = manual.key;
      value = manual.value;
    }
    setCardio({
      ...cardio,
      [key]: value,
    });
  }
  function HandleStrength(e, manual) {
    let key;
    let value;
    if (!manual && e.target.type === "date") {
      key = e.target.name;
      value = e.target.value;
    } else if (manual === false) {
      key = e.target.name;
      value = Number(e.target.value);
    } else {
      key = manual.key;
      value = manual.value;
      console.log(key, value);
    }
    setStrength({
      ...strength,
      [key]: value,
    });
  }
  useEffect(() => {
    fetchWorkouts();
  }, [searchTerm]);
  return (
    <div className="bg-[#073B4C] w-full h-screen py-20">
      <div className="flex items-center justify-center">
        <WorkoutSearchModal
          searchTerm={searchTerm}
          handleCardio={HandleCardio}
          handleStrength={HandleStrength}
          cardio={cardio}
          strength={strength}
          visible={showModal}
          handleClose={HandleClose}
          data={workouts}
        />
        <div className="bg-[#C7E8F3] shadow-xl rounded-lg flex flex-col w-[800px] h-[600px]">
          <div className=" max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2 space-y-1">
            <div className="text-center bg-[#BF9ACA] px-6 py-8 rounded shadow-md text-black w-full">
              <h1 className="text-[#073B4C] font-semibold mb-8 text-3xl text-center">
                Add a Workout
              </h1>
              <select value={searchTerm} onChange={HandleSearchInput}>
                <option value="">Choose a workout</option>
                <option value="Abdominals">Abdominals</option>
                <option value="Adductors">Adductors</option>
                <option value="Abductors">Abductors</option>
                <option value="Biceps">Biceps</option>
                <option value="Calves">Calves</option>
                <option value="Chest">Chest</option>
                <option value="Forearms">Forearms</option>
                <option value="Glutes">Glutes</option>
                <option value="Hamstrings">Hamstrings</option>
                <option value="Lats">Lats</option>
                <option value="Lower_back">Lower_back</option>
                <option value="Middle_back">Middle_back</option>
                <option value="Neck">Neck</option>
                <option value="Quadriceps">Quadriceps</option>
                <option value="Traps">Traps</option>
                <option value="Triceps">Triceps</option>
              </select>
              <div className="text-[#073B4C] mt-2 font-semibold">
                {strength.workout}
              </div>
            </div>
            <div className=" bg-[#BF9ACA] mt-4 block border w-full p-3 rounded mb-4">
              <label className="font-semibold px-3">Calendar</label>
              <input
                onChange={HandleStrength}
                name="workout_date"
                type="date"
              ></input>
            </div>
            <div className="bg-[#BF9ACA] block border w-full p-3 rounded mb-4">
              <label className="font-semibold px-1">Workout Type</label>
              <select onChange={HandleWorkoutType} value={workoutType}>
                <option value="">Choose the type of workout</option>
                <option value="cardio">Cardio</option>
                <option value="olympic_weightlifting">
                  Olympic weightlifting
                </option>
                <option value="powerlifting">Powerlifting</option>
                <option value="strength">Strength training</option>
                <option value="strongman">Strongman</option>
              </select>
            </div>
            <button
              type="button"
              onClick={handleSumbit}
              className="w-full bg-[#BF9ACA] hover:bg-[#dfc4e7] text-white font-bold py-2 px-4 rounded"
            >
              Add to your plan
            </button>
            {/* {HandleWorkoutForm()} */}
            <StrengthWorkoutForm
              workoutType={workoutType}
              showWorkoutModal={showWorkoutModal}
              setShowWorkoutModal={setShowWorkoutModal}
              searchTerm={searchTerm}
              HandleStrength={HandleStrength}
              strength={strength}
            />
            <CardioWorkoutForm
              setShowWorkoutModal={setShowWorkoutModal}
              showWorkoutModal={showWorkoutModal}
              workoutType={workoutType}
              searchTerm={searchTerm}
              HandleCardio={HandleCardio}
              cardio={cardio}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default WorkoutPlan;
