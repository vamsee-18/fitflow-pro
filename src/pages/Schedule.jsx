
export default function Schedule() {
  const days = [
    { day: "Monday", workout: "Chest & Triceps", type: "Training day" },
    { day: "Tuesday", workout: "Cardio", type: "Training day" },
    { day: "Wednesday", workout: "Back & Biceps", type: "Training day" },
    { day: "Thursday", workout: "Active Recovery", type: "Training day" },
    { day: "Friday", workout: "Legs", type: "Training day" },
    { day: "Saturday", workout: "Full Body", type: "Training day" },
    { day: "Sunday", workout: "Rest Day", type: "Recovery" }
  ];

  return (
    <section className="pro-panel">
      <h2>Weekly Workout Schedule</h2>
      <p>Plan your fitness week and stay consistent.</p>

      <div className="schedule-grid">
        {days.map((item, i) => (
          <article key={item.day}>
            <small>DAY {i + 1}</small>
            <h3>{item.day}</h3>
            <p>{item.workout}</p>
            <span>{item.type}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
