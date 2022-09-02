import React, { useState, useEffect } from 'react'


function WorkoutPlanList() {

    const [workouts,setWorkouts] = useState([])
    
    const fetchWorkouts = async () => {
        const workoutstUrl = 'http://localhost:8020/api/workouts/'
        const response = await fetch(workoutstUrl)
        const {workouts} = await response.json();
        console.log(workouts)
        setWorkouts(workouts)
    }
    useEffect(() => {
        fetchWorkouts()
    }, []);
    
    const cancelWorkout = async (id) => {
        const cancelUrl = `http://localhost:8020/api/workouts/${id}/`
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

    return (
        <>
            <h1>Workout Plan</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Sets</th>
                        <th>Repetitions</th>
                        <th>Weight</th>
                    </tr>
                </thead>
                <tbody>
                    {workouts.map(workout => {
                        return (
                            <tr key={workout.id}>
                                <td> {workout.sets} </td>
                                <td> {workout.repetitions} </td>
                                <td> {workout.weight} </td>
                                <td><button className="btn btn-danger" onClick={() => cancelWorkout(workout.id)}>delete</button></td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            </>
        );
    }

export default WorkoutPlanList;