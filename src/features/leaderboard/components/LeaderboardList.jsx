import LeaderboardItem from './LeaderboardItem';

export default function LeaderboardList({ top, me }) {
  return (
    <section className="card">
      <div className="section-header">
        <h2>Топ-100 игроков</h2>
      </div>
      <ol className="leaderboard-list">
        {top.map((player) => (
          <LeaderboardItem
            key={player.playerId}
            player={player}
            isMe={player.playerId === me?.playerId}
          />
        ))}
      </ol>
    </section>
  );
}
