export function isPlayerInsideTop(topList, me) {
  if (!me?.rank) return false;
  return topList.some((player) => player.playerId === me.playerId);
}
