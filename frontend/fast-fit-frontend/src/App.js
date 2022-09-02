import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'

import Nav from './Nav';
import Dashboard from './Dashboard';
import SignUp from './Auth/Signup';
import WorkoutPlanForm from './Workouts/WorkoutPlanForm'
import UserMeals from './Recipes/userMeals';
import HealthDataForm from './health_data/HealthMain';
import WorkoutPlanList from  './Workouts/WorkoutPlanList';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/workout" element={<WorkoutPlanForm />} />
          <Route path="/workout/plan" element={<WorkoutPlanList />} />
          <Route path="/meals" element={<UserMeals />} />
          <Route path="/health" element={<HealthDataForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
