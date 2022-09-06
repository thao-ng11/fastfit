import React, { useState,} from 'react';


function WorkoutEntry({workout}) {

function setActive(){
    workout.setSelectedWorkout(workout.id)
}
return (
    <div onClick={setActive}>
        <div>
            <h3></h3>
            <h4>{workout.sets} sets of {workout.repetitions} reps {workout.weight} pounds</h4>
        </div>
        <div>
            <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">View workout</button>
            <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Delete</button>
        </div>

    </div>
)
}

export default WorkoutEntry;