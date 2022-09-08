import React, { useState, useEffect } from 'react'
import WorkoutEntry from './WorkoutEntry'

function WorkoutPlanList() {

    const [workouts,setWorkouts] = useState([])
    const [dateFilter,setDateFilter] = useState('')
    const fetchWorkouts = async () => {
        const strengthWorkoutstUrl = 'http://localhost:8020/api/strength_workout/'
        const cardioWorkoutsUrl ='http://localhost:8020/api/cardio_workout/'
        const response = await fetch(strengthWorkoutstUrl, {
            credentials: "include",
          })
        const response2 = await fetch(cardioWorkoutsUrl, {
            credentials: "include",
          })
        const data = await response.json();
        const data2 = await response2.json();
        console.log(data)
        const allData = data.concat(data2)
        setWorkouts(allData)
    }
    useEffect(() => {
        fetchWorkouts()
    }, []);
    
    const cancelWorkout = async (id,type) => {
        const cancelUrl = `http://localhost:8020/api/${type}/${id}/`
        const fetchConfig = {
            method: "delete"
        }
        const cancelResponse = await fetch(cancelUrl, fetchConfig)
        if (cancelResponse.ok){
            let updatedworkouts = [];
            updatedworkouts = workouts.filter(workout => workout.id !== id)
            setWorkouts(updatedworkouts);
        }
    }
    function filterDates(e){
        setDateFilter(e.target.value);
    }
    return (
        <>
            <h1></h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Workout Plan</th>
                        <select onChange={filterDates}>{workouts.map(workout =>{
                            return(<option value={workout.workout_date}>{workout.workout_date}</option>)
                        })}</select>
                    </tr>
                </thead>
                <tbody>
                    {workouts.map(workout => {
                        console.log(workout.workout_date)
                        if (workout.workout_date.includes(dateFilter)){
                            return (
                                <WorkoutEntry workout={workout}
                                cancelWorkout={cancelWorkout}/>
                            );
                        }
                    })}
                </tbody>
            </table>
            </>
        );
    }

export default WorkoutPlanList;