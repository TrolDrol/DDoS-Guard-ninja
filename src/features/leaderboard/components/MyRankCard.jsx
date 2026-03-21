export default function MyRankCard({ me }) {
  if (!me) return null;

  return (
    <section id="my-rank" className="card my-rank-card">
      <div className="section-header">
        <h2>Моя позиция</h2>
      </div>
      <div className="my-rank-grid">
        <div>
          <div className="muted-label">Игрок</div>
          <div className="strong-value">{me.name}</div>
        </div>
        <div>
          <div className="muted-label">Место</div>
          <div className="strong-value">#{me.rank}</div>
        </div>
        <div>
          <div className="muted-label">Счёт</div>
          <div className="strong-value">{me.score}</div>
        </div>
      </div>
    </section>
  );
}
