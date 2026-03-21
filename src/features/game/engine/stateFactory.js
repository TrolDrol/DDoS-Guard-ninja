import { GAME_CONFIG } from './config';
import { GAME_STATUS } from './constants';

export function createInitialGameState() {
  return {
    status: GAME_STATUS.IDLE,
    score: 0,
    lives: GAME_CONFIG.startLives,
    startedAt: null,
    finishedAt: null,
    elapsedMs: 0,
    entities: [],
    lanes: Array.from({ length: GAME_CONFIG.laneCount }, (_, index) => ({
      index,
      shieldUntil: 0,
    })),
    bottomImageKey: 'normal',
    gameOverSubmitted: false,
    activeShieldLane: null,
    pulseEffects: [],
    gameOverReason: null,
  };
}
