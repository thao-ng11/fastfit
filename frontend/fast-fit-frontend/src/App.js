import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'

import Nav from './Nav';
import Dashboard from './Dashboard';
import WorkoutPlanForm from './Workouts/WorkoutPlanForm'

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/workout" element={<WorkoutPlanForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
