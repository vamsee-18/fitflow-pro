
function WeeklyBarChart({ data }) {
  const max = Math.max(1, ...data.map(d => d.workouts));

  return (
    <svg viewBox="0 0 700 220" width="100%" height="100%">
      {[30, 75, 120, 175].map(y => (
        <line
          key={y}
          x1="35"
          y1={y}
          x2="665"
          y2={y}
          stroke="currentColor"
          strokeOpacity=".15"
          strokeDasharray="4 5"
        />
      ))}

      {data.map((d, i) => {
        const x = 55 + i * 88;
        const height = (d.workouts / max) * 140;

        return (
          <g key={i}>
            <rect
              x={x}
              y={175 - height}
              width="42"
              height={Math.max(2, height)}
              rx="6"
              fill="#9675ff"
            />
            <text
              x={x + 21}
              y="205"
              textAnchor="middle"
              fill="currentColor"
              fontSize="12"
            >
              {d.day}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export default function Progress({
  completed,
  caloriesBurned,
  myActivities,
  myFoods,
  chartData,
  weight,
  setWeight,
  saveWeight
}) {
  return (
    <>
      <section className="stat-grid">
        <article className="stat-card">
          <span>✦</span>
          <small>WORKOUTS</small>
          <h2>{completed.length}</h2>
        </article>

        <article className="stat-card">
          <span>🔥</span>
          <small>CALORIES BURNED</small>
          <h2>{caloriesBurned}</h2>
        </article>

        <article className="stat-card">
          <span>⚖</span>
          <small>WEIGHT ENTRIES</small>
          <h2>{myActivities.filter(a => a.weight).length}</h2>
        </article>

        <article className="stat-card">
          <span>◈</span>
          <small>MEALS TRACKED</small>
          <h2>{myFoods.length}</h2>
        </article>
      </section>

      <section className="pro-panel">
        <h3>Weekly Workout Report</h3>
        <div className="chart-area">
          <WeeklyBarChart data={chartData} />
        </div>
      </section>

      <section className="pro-panel">
        <h3>Record Your Weight</h3>

        <form onSubmit={saveWeight} className="inline-form">
          <input
            type="number"
            step="0.1"
            min="1"
            value={weight}
            onChange={e => setWeight(e.target.value)}
            placeholder="Weight in kg"
            required
          />

          <button className="primary-btn">Save Weight</button>
        </form>

        {myActivities.filter(a => a.weight).map((a, i) => (
          <p key={i}>
            {new Date(a.date).toLocaleDateString()}: {a.weight} kg
          </p>
        ))}
      </section>
    </>
  );
}
