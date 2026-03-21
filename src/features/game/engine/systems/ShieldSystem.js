import { GAME_CONFIG } from '../config';

export function activateShield(state, laneIndex, now) {
  if (!state.lanes[laneIndex]) return;

  state.lanes[laneIndex].shieldUntil = now + GAME_CONFIG.shieldDurationMs;
  state.activeShieldLane = laneIndex;
}

export function updateShieldState(state, now) {
  const activeLane = state.lanes.find((lane) => lane.shieldUntil > now);
  state.activeShieldLane = activeLane ? activeLane.index : null;
}
