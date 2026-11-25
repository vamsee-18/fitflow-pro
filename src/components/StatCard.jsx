
function StatCard({ icon, title, value, description }) {
  return (
    <article className="stat-card">
      <span>{icon}</span>
      <small>{title}</small>
      <h2>{value}</h2>
      <p>{description}</p>
    </article>
  );
}

export default StatCard;
