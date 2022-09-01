import React, { useState} from 'react';
import CardioWorkoutForm from './CardioWorkoutsForm';
import StrengthWorkoutForm from './StrengthWorkoutsForm';
import WorkoutSearchModal from './WorkoutsearchModal';

function WorkoutPlan() {
    const [workoutType, setWorkoutType] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const [workouts, setWorkouts] = useState([])
    const [cardio, setCardio] = useState({
        "username": "neendicott",
        "category": 0,
        "workout_date": "2022-08-31",
        "duration": 0,
        "distance": 0,
    })
    const [strength,setStrength] = useState({
        "username": "neendicott",
        "category": 0,
        "muscle_group": 0,
        "workout_date": "2022-08-31",
        "sets": 0,
        "repetitions": 0,
        "weight": 0,
    })
        function HandleWorkoutForm(){
            switch (workoutType) {
                case "cardio":
                    return <CardioWorkoutForm HandleCardio={HandleCardio}/>
                    break;
                case "strength":
                case "powerlifting":
                case "olympic_weightlifting":
                case "strongman":
                    return <StrengthWorkoutForm HandleStrength={HandleStrength}/>
                    break;
                    
                default:
                    return('')
                    break;
            }

        }
        function HandleWorkoutType(e){
            setWorkoutType(e.target.value)

        }
        async function HandleSearch(){
            await fetchWorkouts()
            setShowModal(true)
        }
        function HandleSearchInput(e){
            setSearchTerm(e.target.value)
        }
        function HandleClose(){
            setShowModal(false)
        }
        async function fetchWorkouts(){
            let data = await fetch(`https://api.api-ninjas.com/v1/exercises?muscle=${searchTerm}`,{method:'GET', headers:{'X-Api-Key': 'w+trDWPcrCQuuNR+MYj+Xw==Bk9KDso4mOxNi8CD'}})
            data = await data.json() 
            setWorkouts(data)
        }
        function HandleCardio(e){
            setCardio({...cardio, 
                [e.target.name]: e.target.value
            })
        }
        function HandleStrength(e){
            setStrength({...strength, 
                [e.target.name]: e.target.value
            })
        }
    return (
        <div>
            <WorkoutSearchModal visible ={showModal} handleClose={HandleClose} data={workouts}/>
            <h1>Add a Workout</h1>
            <div className='flex flex-row'>
                <label></label>
                <input value={searchTerm} onChange={HandleSearchInput}></input>
                <button onClick={HandleSearch}>Search for a Workout</button>
            </div>
            <div className='flex flex-row'>
                <label>Calendar</label>
                <input name='workout_date' type='datetime-local'></input>
                
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
