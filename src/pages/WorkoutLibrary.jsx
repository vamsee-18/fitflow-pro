import WorkoutCard from "../components/WorkoutCard.jsx";
export default function WorkoutLibrary({
  workouts,
  search,
  setSearch,
  category,
  setCategory,
  categories,
  filteredWorkouts,
  selectedWorkout,
  getWorkoutImage,
  handleViewWorkout,
  setSelectedWorkout,
  timerRunning,
  setTimerRunning,
  seconds,
  setSeconds,
  completeWorkout
}) {
  return (
    <>
      <section className="page-intro">
        <h2>Find your next workout</h2>
        <p>
          Explore professional training plans for every fitness level.
        </p>
      </section>

      <div className="library-tools">
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search workouts..."
        />

        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
        >
          {categories.map(c => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </div>

      {selectedWorkout && (
        <section className="pro-panel selected-workout">
          <button
            className="close-btn"
            onClick={() => {
              setSelectedWorkout(null);
              setTimerRunning(false);
              setSeconds(0);
            }}
          >
            ✕
          </button>

          <div
            className="detail-workout-image"
            style={{
              backgroundImage: `url("${getWorkoutImage(selectedWorkout)}")`
            }}
          >
            <span>{selectedWorkout.category} TRAINING</span>
          </div>

          <small>WORKOUT DETAILS</small>
          <h2>{selectedWorkout.name}</h2>
          <p>{selectedWorkout.exercises}</p>

          <div className="detail-meta">
            <span>◷ {selectedWorkout.minutes} minutes</span>
            <span>🔥 {selectedWorkout.calories} kcal</span>
            <span>✦ {selectedWorkout.level}</span>
          </div>

          <h3>Workout Timer</h3>

          <div className="timer-display">
            {String(Math.floor(seconds / 60)).padStart(2, "0")}:
            {String(seconds % 60).padStart(2, "0")}
          </div>

          <button
            className="primary-btn"
            onClick={() => setTimerRunning(!timerRunning)}
          >
            {timerRunning ? "Pause Timer" : "Start Timer"}
          </button>

          <button
            className="secondary-btn"
            onClick={() => {
              setTimerRunning(false);
              setSeconds(0);
            }}
          >
            Reset Timer
          </button>

          <button
            className="primary-btn"
            onClick={() => completeWorkout(selectedWorkout)}
          >
            Complete Workout
          </button>
        </section>
      )}

      <div className="workout-library">
        {filteredWorkouts.map(w => (
          <WorkoutCard
            key={w.id}
            workout={w}
            image={getWorkoutImage(w)}
            onViewWorkout={handleViewWorkout}
          />
        ))}
      </div>

      {filteredWorkouts.length === 0 && (
        <section className="pro-panel">
          <h3>No workouts found</h3>
          <p>Try another search or category.</p>
        </section>
      )}
    </>
  );
}

