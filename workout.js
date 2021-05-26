function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
const workoutLogArea = document.querySelector('#workout-log');
const submit = document.querySelector('#submit');

let workouts = [];
const workoutsJSON = localStorage.getItem('workouts');
if (workoutsJSON !== null) {
  workouts = JSON.parse(workoutsJSON);
} else {
  workouts = [];
}

let filter = {
  input: '',
};

submit.addEventListener('submit', (e) => {
  e.preventDefault();
  const id = uuidv4();
  workouts.push({
    id: id,
    date: '',
    equipment: '',
    bodypart: '',
    exercise: '',
    sets: '',
    reps: '',
  });

  localStorage.setItem('workouts', JSON.stringify(workouts));

  location.assign(`./editpage.html#${id}`);
});

function renderWorkouts(workouts) {
  workouts.forEach((workout) => {
    let workoutContainer = document.createElement('div');

    let workoutEl = document.createElement('a');
    workoutEl.textContent = `Date: ${workout.date} ${workout.equipment} ${workout.bodypart} ${workout.exercise} ${workout.sets} Sets of ${workout.reps} Reps`;
    workoutEl.setAttribute('href', `./editpage.html#${workout.id}`);
    let deleteBtn = document.createElement('button');
    deleteBtn.innerText = 'X';
    deleteBtn.addEventListener('click', function () {
      removeWorkout(workout.id);
      localStorage.setItem('workouts', JSON.stringify(workouts));
      workoutLogArea.innerHTML = '';
      renderWorkouts(workouts);
    });

    workoutContainer.append(deleteBtn);
    workoutContainer.append(workoutEl);

    workoutLogArea.append(workoutContainer);
  });
}

const removeWorkout = function (id) {
  const workoutIndex = workouts.findIndex(function (workout) {
    return workout.id === id;
  });

  if (workoutIndex > -1) {
    workouts.splice(workoutIndex, 1);
  }
};

document.querySelector('#delete-log').addEventListener('click', () => {
  localStorage.clear();
  workoutLogArea.innerHTML = '';
});

document.querySelector('#filter-input').addEventListener('input', (e) => {
  filter.input = e.target.value;

  function filterWorkouts(workouts, filter) {
    const filterLogs = workouts.filter((workout) => {
      return (
        workout.equipment.toLowerCase().includes(filter.input.toLowerCase()) ||
        workout.bodypart.toLowerCase().includes(filter.input.toLowerCase()) ||
        workout.exercise.toLowerCase().includes(filter.input.toLowerCase())
      );
    });
    renderWorkouts(filterLogs);
  }
  workoutLogArea.innerHTML = '';

  filterWorkouts(workouts, filter);
});

renderWorkouts(workouts);
