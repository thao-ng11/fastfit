import React, { useState, useEffect } from 'react'
import WorkoutEntry from './WorkoutEntry'
import { useToken } from '../Authentication'

function WorkoutPlanList() {
    const [token] = useToken()
    console.log(token)
    let dates = []
    const [workouts,setWorkouts] = useState([])
    const [dateFilter,setDateFilter] = useState('')
    const fetchWorkouts = async () => {
        const strengthWorkoutstUrl = 'http://localhost:8020/api/strength_workout/user'
        const cardioWorkoutsUrl ='http://localhost:8020/api/cardio_workout/user'
        const response = await fetch(strengthWorkoutstUrl, {
            credentials: "include",
            headers: {
                Authorization: `Bearer ${token}` 
            },
          })
        const response2 = await fetch(cardioWorkoutsUrl, {
            credentials: "include",
            headers: {
                Authorization: `Bearer ${token}` 
            },
          })
        const data = await response.json();
        const data2 = await response2.json();
        console.log(data)
        const allData = data.concat(data2)
        setWorkouts(allData)
    }
    useEffect(() => {
        fetchWorkouts()
    }, [token]);
    
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
        <div className='w-screen h-screen py-20'>
            <div className='flex item-center justify-center'>
            <div className='w-[650px] bg-[#C7E8F3] px-[26px] py-4 rounded-lg shadow-xl'>
            <div className='w-[600px] bg-white px-4 py-4 rounded-lg shadow-xl'>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Workout Plan</th>
                        <select onChange={filterDates}>{workouts.map(workout =>{
                            if  (!dates.includes(workout.workout_date)){
                                dates.push(workout.workout_date)
                                return(<option value={workout.workout_date}>{workout.workout_date}</option>)
                            }
                        })}</select>
                    </tr>
                </thead>
                <tbody >
                    {workouts.map(workout => {
                        if (workout.workout_date.includes(dateFilter)){
                            return (
                                <WorkoutEntry className='hover:bg-gray-300' workout={workout}
                                cancelWorkout={cancelWorkout}/>
                            );
                        }
                    })}
                </tbody>
            </table>
            </div>
            </div>
            </div>
            </div>
        );
    }

export default WorkoutPlanList;