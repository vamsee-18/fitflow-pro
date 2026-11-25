
function WorkoutCard({ workout, image, onViewWorkout }) {
  return (
    <article className="library-card">
      <div
        className="library-image"
        style={{
          backgroundImage: `url("${image}")`
        }}
      >
        <small>{workout.category}</small>
        <span className="image-overlay">FITFLOW TRAINING</span>
      </div>

      <div className="library-content">
        <span className="level-tag">{workout.level}</span>
        <h3>{workout.name}</h3>
        <p>{workout.exercises}</p>

        <div className="workout-meta">
          <span>◷ {workout.minutes} min</span>
          <span>🔥 {workout.calories} kcal</span>
        </div>

        <button
          className="primary-btn"
          onClick={() => onViewWorkout(workout)}
        >
          View Workout
        </button>
      </div>
    </article>
  );
}

export default WorkoutCard;
