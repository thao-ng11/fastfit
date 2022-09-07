import React, { useState, useEffect } from 'react';
import CardioWorkoutForm from './CardioWorkoutsForm';
import StrengthWorkoutForm from './StrengthWorkoutsForm';
import WorkoutSearchModal from './WorkoutsearchModal';
import Workout from './Workout';
import { useNavigate } from 'react-router-dom';

function WorkoutPlan() {
    const [workoutType, setWorkoutType] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const [workouts, setWorkouts] = useState([])
    const [selectedWorkout, setSelectedWorkout] = useState(0)
    const [cardio, setCardio] = useState({
        "username": "neendicott",
        "category": 0,
        "workout_date": "2022-08-31",
        "duration": 0,
        "distance": 0,
    })
    const [strength, setStrength] = useState({
        "username": "neendicott",
        "category": 0,
        "muscle_group": 0,
        "workout_date": "2022-08-31",
        "sets": 0,
        "repetitions": 0,
        "weight": 0,
    })
    const navigate = useNavigate()
    function HandleWorkoutForm() {
        switch (workoutType) {
            case "cardio":
                return <CardioWorkoutForm HandleCardio={HandleCardio} cardio={cardio} />
                break;
            case "strength":
            case "powerlifting":
            case "olympic_weightlifting":
            case "strongman":
                return <StrengthWorkoutForm HandleStrength={HandleStrength} strength={strength} />
                break;

            default:
                return ('')
                break;
        }

    }
    function HandleWorkoutType(e) {
        setWorkoutType(e.target.value)
        if (e.target.value === 'cardio') {
            setCardio({ ...cardio, category: e.target.value })
        } else {
            setStrength({ ...strength, category: e.target.value })
        }

    }
    async function handleSumbit() {
        if (workoutType === "cardio") {
            await fetch(`${process.env.REACT_APP_WORKOUTS_HOST}/api/cardio_workout`, {
                method: 'POST', headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }, body: JSON.stringify(cardio)
            })
        } else {
            await fetch(`${process.env.REACT_APP_WORKOUTS_HOST}/api/strength_workout`, {
                method: 'POST', headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }, body: JSON.stringify(strength)
            })
        }
        navigate('/workout/plan')
        console.log('Strength', strength)
        console.log('cardio', cardio)
    }
    async function HandleSearch() {
        await fetchWorkouts()
        setShowModal(true)
    }
    function HandleSearchInput(e) {
        setSearchTerm(e.target.value)
        setStrength({ ...strength, muscle_group: e.target.value })
    }
    function HandleClose() {
        setShowModal(false)
    }
    async function fetchWorkouts() {
        let data = await fetch(`https://api.api-ninjas.com/v1/exercises?muscle=${searchTerm}`, { method: 'GET', headers: { 'X-Api-Key': 'w+trDWPcrCQuuNR+MYj+Xw==Bk9KDso4mOxNi8CD' } })
        data = await data.json()
        setWorkouts(data)
    }
    function HandleCardio(e) {
        setCardio({
            ...cardio,
            [e.target.name]: Number(e.target.value)
        })
    }
    function HandleStrength(e) {
        setStrength({
            ...strength,
            [e.target.name]: Number(e.target.value)
        })
    }
    useEffect(() => { fetchWorkouts() }, [searchTerm])
    return (
    <div className='bg-[#C7E8F3] w-full'>
        <div>
            <WorkoutSearchModal visible={showModal} handleClose={HandleClose} data={workouts} />
            <div className="w-screen bg-grey-lighter min-h-screen flex flex-col">
                <div className=" max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2 space-y-1">
                    <div className="text-center bg-[#BF9ACA] px-6 py-8 rounded shadow-md text-black w-full">
                        <h1 className="text-[#073B4C] font-semibold mb-8 text-3xl text-center">Add a Workout</h1>
                        <select value={searchTerm} onChange={HandleSearchInput}>
                            <option value=''>Choose a workout</option>
                            <option value="Abdominals">Abdominals</option>
                            <option value="Adductors">Adductors</option>
                            <option value="Abbductors">Abbductors</option>
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
                    </div>
                    {workouts.map((workout, id) => {
                        return (
                            <div className='bg-[#BF9ACA] font-semibold py-[.35rem] w-full text-center shadow-md rounded-md bg-gray-50 border border-gray-300 hover:bg-gray-100'>
                                <Workout name={workout.name}
                                    id={id}
                                    selectedWorkout={selectedWorkout}
                                    setSelectedWorkout={setSelectedWorkout} />
                            </div>
                        )
                    })}
                    <div className=" bg-[#BF9ACA] mt-4 block border border-grey-light w-full p-3 rounded mb-4">
                        <label className='font-semibold px-3'>Calendar</label>
                        <input name='workout_date' type='datetime-local'></input>

                    </div>
                    <div className="bg-[#BF9ACA] block border border-grey-light w-full p-3 rounded mb-4">
                        <label className='font-semibold px-1'>Workout Type</label>
                        <select onChange={HandleWorkoutType} value={workoutType}>
                            <option value=''>Choose the type of workout</option>
                            <option value="cardio">Cardio</option>
                            <option value="olympic_weightlifting">Olympic weightlifting</option>
                            <option value="powerlifting">Powerlifting</option>
                            <option value="strength">Strength training</option>
                            <option value="strongman">Strongman</option>
                        </select>

                    </div>
                    <button type="button" onClick={handleSumbit} className="w-full bg-[#BF9ACA] hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                        Add to your plan</button>
                    {HandleWorkoutForm()}
                </div>
            </div>

        </div>
        </div>


    )
}

export default WorkoutPlan;
