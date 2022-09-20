import React from "react";

function WorkoutEntry({ workout, cancelWorkout }) {
  function Delete() {
    if (
      workout.muscle_group === "Abdominals" ||
      workout.workout === "Jumping rope"
    ) {
      cancelWorkout(workout.id, "cardio_workout");
    } else {
      cancelWorkout(workout.id, "strength_workout");
    }
  }
  return (
    <div>
      <div className=" flex item-center justify-center">
        <div className="grid-rows-4 gap-3 text-center">
          <br></br>
          <h4 className="font-semibold text-lg">{workout.workout}</h4>
          <h5>
            {workout.sets} sets of {workout.repetitions} reps {workout.weight}{" "}
            pounds
          </h5>
          <div className="py-2">
            <button
              onClick={Delete}
              className=" bg-[#BF9ACA] hover:bg-[#dfc4e7] text-white font-bold py-2 px-4 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
      {/* <div className='flex item-center justify-center'>
            {/* <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">View workout</button> */}
      {/* <button onClick={Delete} class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Delete</button>
        </div> */}
    </div>
  );
}

export default WorkoutEntry;
