import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useToken } from "./Authentication";
import Nav from "./Nav";
import Dashboard from "./Dashboard";
import SignUp from "./Auth/Signup";
import WorkoutPlanForm from "./Workouts/WorkoutPlanForm";
import UserMeals from "./Recipes/userMeals";
import HealthDataForm from "./health_data/HealthMain";
import JournalForm from "./journals/journalForm";
import Login from "./Auth/Login";
import WorkoutPlanList from "./Workouts/WorkoutPlanList";

function App() {
  const [token, login, logout, signup, update] = useToken()
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [status, setStatus] = useState(null);

  const getLocation = () => {
    if (!navigator.geolocation) {
      setStatus('Geolocation is not supported by your browser');
    } else {
      setStatus('Locating...');
      navigator.geolocation.getCurrentPosition((position) => {
        setStatus(null);
        setLat(position.coords.latitude);
        setLng(position.coords.longitude);
      }, () => {
        setStatus('Unable to retrieve your location');
      });
    }
  }
  return (
    <>
      <Nav />
        <Routes>
          <Route path="/" element={<Dashboard lat={lat} lng={lng}/>} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login login={login} />} />
          <Route path="/workout" element={<WorkoutPlanForm />} />
<<<<<<< HEAD
          <Route path="/workout/plan" element={<WorkoutPlanList />} />
          <Route path="/meals" element={<UserMeals />} />
=======
          <Route path="/meals" element={<UserMeals token={token} />} />
>>>>>>> main
          <Route path="/health" element={<HealthDataForm />} />
          <Route path="/journal" element={<JournalForm />} />
        </Routes>

    </>
  );
}

export default App;
