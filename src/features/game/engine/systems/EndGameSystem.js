import { GAME_OVER_REASONS, GAME_STATUS } from '../constants';
import { GAME_CONFIG } from '../config';

function finishGame(engine, now, reason, finishedAt = now) {
  if (engine.state.status === GAME_STATUS.GAME_OVER) return;

  engine.state.status = GAME_STATUS.GAME_OVER;
  engine.state.finishedAt = finishedAt;
  engine.state.elapsedMs = finishedAt - engine.state.startedAt;
  engine.state.gameOverReason = reason;
}

export function updateEndGameSystem(engine, now) {
  if (engine.state.lives <= 0) {
    finishGame(engine, now, GAME_OVER_REASONS.NO_LIVES);
    return;
  }

  if (engine.state.elapsedMs >= GAME_CONFIG.maxGameDurationMs) {
    finishGame(
      engine,
      now,
      GAME_OVER_REASONS.TIME_LIMIT,
      engine.state.startedAt + GAME_CONFIG.maxGameDurationMs,
    );
  }
}
