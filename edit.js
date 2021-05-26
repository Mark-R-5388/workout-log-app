const workoutId = location.hash.substring(1);
const removeBtn = document.querySelector('#remove-button');
let workouts = [];
const workoutsJSON = localStorage.getItem('workouts');
if (workoutsJSON !== null) {
  workouts = JSON.parse(workoutsJSON);
} else {
  workouts = [];
}
const workout = workouts.find((workout) => {
  return workout.id === workoutId;
});

if (workout === undefined) {
  location.assign('./index.html');
}

submit.addEventListener('submit', (e) => {
  e.preventDefault();
  (workout.date = e.target.date.value),
    (workout.equipment = e.target.equipment.value),
    (workout.bodypart = e.target.bodypart.value),
    (workout.exercise = e.target.exercise.value),
    (workout.sets = e.target.sets.value),
    (workout.reps = e.target.reps.value),
    localStorage.setItem('workouts', JSON.stringify(workouts));
  location.assign('./index.html');
});

removeBtn.addEventListener('click', () => {
  removeWorkout(workoutId);
  localStorage.setItem('workouts', JSON.stringify(workouts));
  location.assign('./index.html');
});

const removeWorkout = function (id) {
  const workoutIndex = workouts.findIndex(function (workout) {
    return workout.id === id;
  });

  if (workoutIndex > -1) {
    workouts.splice(workoutIndex, 1);
  }
};
