export default function LeaderboardItem({ player, isMe = false }) {
  return (
    <li className={`leaderboard-item ${isMe ? 'leaderboard-item--me' : ''}`}>
      <span className="leaderboard-rank">#{player.rank}</span>
      <span className="leaderboard-name">{player.name}</span>
      <span className="leaderboard-score">{player.score}</span>
    </li>
  );
}
