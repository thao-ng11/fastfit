import logo from "./logo.svg";
import "./App.css";
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

function App() {
  const [token, login, logout, signup, update] = useToken()
  return (
    <>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login login={login} />} />
          <Route path="/workout" element={<WorkoutPlanForm />} />
          <Route path="/meals" element={<UserMeals />} />
          <Route path="/health" element={<HealthDataForm />} />
          <Route path="/journal" element={<JournalForm />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
