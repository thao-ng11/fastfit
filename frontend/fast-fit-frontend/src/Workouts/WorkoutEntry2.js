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
    <tr className="flex item-center justify-center">
      <th className="font-medium text-lg ">{workout.workout}:</th>
      <th className="pl-2 pt-1 font-normal">
        {workout.sets} sets of {workout.repetitions} reps {workout.weight}{" "}
        pounds
      </th>
    </tr>
  );
}

export default WorkoutEntry;
