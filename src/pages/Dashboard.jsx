
function WeeklyAreaChart({ data }) {
  const max = Math.max(100, ...data.map(d => d.calories));

  const points = data.map((d, i) => {
    const x = 45 + i * (610 / Math.max(1, data.length - 1));
    const y = 175 - (d.calories / max) * 145;
    return `${x},${y}`;
  }).join(" ");

  return (
    <svg viewBox="0 0 700 220" width="100%" height="100%">
      {[30, 75, 120, 175].map(y => (
        <line key={y} x1="45" y1={y} x2="655" y2={y}
          stroke="currentColor" strokeOpacity=".15" strokeDasharray="4 5" />
      ))}
      <polygon points={`45,175 ${points} 655,175`} fill="#9675ff" opacity=".16" />
      <polyline points={points} fill="none" stroke="#9675ff"
        strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      {data.map((d, i) => {
        const x = 45 + i * (610 / Math.max(1, data.length - 1));
        const y = 175 - (d.calories / max) * 145;

        return (
          <g key={i}>
            <circle cx={x} cy={y} r="5" fill="#9675ff" />
            <text x={x} y="205" textAnchor="middle"
              fill="currentColor" fontSize="12">{d.day}</text>
          </g>
        );
      })}
    </svg>
  );
}

function Dashboard({
  currentUser,
  completed,
  caloriesBurned,
  caloriesEaten,
  workouts,
  chartData,
  getWorkoutImage,
  onExploreWorkouts,
  onViewProgress,
  onViewAllWorkouts,
  onViewWorkout
}) {
  return (
    <>
      <section className="welcome-banner">
        <div>
          <small>YOUR FITNESS JOURNEY</small>
          <h2>Build your strongest self.</h2>
          <p>Every workout brings you one step closer to your goal.</p>
          <button className="primary-btn" onClick={onExploreWorkouts}>
            Explore Workouts →
          </button>
        </div>

        <div className="banner-icon">🏋️</div>
      </section>

      <section className="stat-grid">
        <StatCard
          icon="✦"
          title="WORKOUTS COMPLETED"
          value={completed.length}
          description="Keep your momentum going"
        />

        <StatCard
          icon="🔥"
          title="CALORIES BURNED"
          value={caloriesBurned.toLocaleString()}
          description="kcal burned"
        />

        <StatCard
          icon="◈"
          title="CALORIES CONSUMED TODAY"
          value={caloriesEaten.toLocaleString()}
          description="kcal tracked today"
        />

        <StatCard
          icon="◎"
          title="WORKOUT LIBRARY"
          value={workouts.length}
          description="Available workout plans"
        />
      </section>

      <section className="dashboard-grid">
        <article className="pro-panel chart-panel">
          <div className="panel-heading">
            <div>
              <h3>Weekly Activity</h3>
              <p>Your workout calories this week</p>
            </div>
            <span className="chart-tag">LAST 7 DAYS</span>
          </div>

          <div className="chart-area">
            <WeeklyAreaChart data={chartData} />
          </div>
        </article>

        <article className="pro-panel goal-panel">
          <h3>Your Fitness Goal</h3>
          <p>Stay consistent and make progress.</p>

          <div className="goal-circle">
            <div>
              <b>{completed.length}</b>
              <small>workouts</small>
            </div>
          </div>

          <p className="goal-note">
            Complete workouts to build your weekly record.
          </p>

          <button className="secondary-btn" onClick={onViewProgress}>
            View Progress
          </button>
        </article>
      </section>

      <section className="pro-panel">
        <div className="panel-heading">
          <div>
            <h3>Recommended Workouts</h3>
            <p>Choose a session for today</p>
          </div>

          <button className="text-btn" onClick={onViewAllWorkouts}>
            View all →
          </button>
        </div>

        <div className="mini-workouts">
          {workouts.slice(0, 3).map(w => (
            <div className="mini-workout" key={w.id}>
              <div
                className="mini-workout-image"
                style={{
                  backgroundImage: `url("${getWorkoutImage(w)}")`
                }}
              />

              <b>{w.name}</b>
              <small>{w.category} · {w.minutes} min</small>

              <button onClick={() => onViewWorkout(w)}>
                View workout →
              </button>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

import StatCard from "../components/StatCard.jsx";

export default Dashboard;
