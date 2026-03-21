function formatTimeLeft(timeLeftMs = 0) {
  const totalSeconds = Math.ceil(timeLeftMs / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, '0')}`;
}

export default function GameHud({ score, lives, timeLeftMs }) {
  return (
    <section className="hud hud--triple">
      <div className="hud-card">
        <span className="hud-label">Счёт</span>
        <strong>{score}</strong>
      </div>
      <div className="hud-card">
        <span className="hud-label">Жизни</span>
        <strong>{lives}</strong>
      </div>
      <div className="hud-card hud-card--timer">
        <span className="hud-label">Осталось</span>
        <strong>{formatTimeLeft(timeLeftMs)}</strong>
      </div>
    </section>
  );
}
