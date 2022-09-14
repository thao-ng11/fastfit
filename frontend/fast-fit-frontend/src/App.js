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
import RecipeSearch from "./Recipes/recipeSearch";
import HealthDataForm from "./health_data/HealthMain";
import Login from "./Auth/Login";
import WorkoutPlanList from "./Workouts/WorkoutPlanList";
import { AuthProvider } from "./Authentication";
import JournalForm from "./journals/journalForm";
import JournalMain from "./journals/journalMain";
import JournalsList from "./journals/journalList";

function App() {
  const [token, login, logout, signup, update] = useToken();
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [status, setStatus] = useState(null);

  const getLocation = () => {
    if (!navigator.geolocation) {
      setStatus("Geolocation is not supported by your browser");
    } else {
      setStatus("Locating...");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setStatus(null);
          setLat(position.coords.latitude);
          setLng(position.coords.longitude);
        },
        () => {
          setStatus("Unable to retrieve your location");
        }
      );
    }
  };
  return (
    <>
      <AuthProvider>
        <Nav />
        <Routes>
          <Route path="/" element={<Dashboard lat={lat} lng={lng} />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login login={login} />} />
          <Route path="/workout" element={<WorkoutPlanForm />} />
          <Route path="/workout/plan" element={<WorkoutPlanList />} />
          <Route path="/meals">
            <Route path="user" element={<UserMeals />} />
            <Route path="search" element={<RecipeSearch />} />
          </Route>
          <Route path="/journals">
            <Route index element={<JournalMain />} />
            <Route path="form" element={<JournalForm />} />
            <Route path="details" element={<JournalsList />} />
          </Route>
          <Route path="/health" element={<HealthDataForm />} />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
