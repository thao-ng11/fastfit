import React, { useState} from 'react';
import CardioWorkoutForm from './CardioWorkoutsForm';
import StrengthWorkoutForm from './StrengthWorkoutsForm';

function WorkoutPlan() {
    const [workoutType, setWorkoutType] = useState('')
    // const [workout, setWorkout] = useState('')
        function HandleWorkoutForm(){
            console.log(workoutType)
            switch (workoutType) {
                case "cardio":
                    return <CardioWorkoutForm/>
                    break;
                case "strength":
                case "powerlifting":
                case "olympic_weightlifting":
                case "strongman":
                    return <StrengthWorkoutForm/>
                    break;
                    
                default:
                    return('')
                    break;
            }

        }
        function HandleWorkoutType(e){
            setWorkoutType(e.target.value)

        }
    return (
        <div>
            <h1>Add a Workout</h1>
            <div className='flex flex-row'>
                <label>Search for a workout</label>
                <input></input>
                <button></button>
            </div>
            <div className='flex flex-row'>
                <label>Calendar</label>
                <input type='calendar'></input>
                
            </div>
            <div className='flex flex-row'>
                <label>Workout Type</label>
                <select onChange={HandleWorkoutType} value={workoutType}>
                    <option value=''>Choose the type of workout</option>
                    <option value="cardio">Cardio</option>
                    <option value="olympic_weightlifting">Olympic weightlifting</option>
                    <option value="powerlifting">Powerlifting</option>
                    <option value="strength">Strength training</option>
                    <option value="strongman">Strongman</option>
                </select>
            </div>
            {HandleWorkoutForm()}
        </div>

    
    )
}

export default WorkoutPlan;
