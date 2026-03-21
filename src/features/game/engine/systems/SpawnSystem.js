import { GAME_CONFIG } from '../config';
import { createEntity } from '../entities/entityFactory';

export function updateSpawnSystem(engine, deltaMs) {
  engine.spawnAccumulator += deltaMs;
  const interval = Math.max(
    GAME_CONFIG.minSpawnIntervalMs,
    GAME_CONFIG.baseSpawnIntervalMs - engine.state.elapsedMs / 180,
  );

  while (engine.spawnAccumulator >= interval) {
    engine.spawnAccumulator -= interval;
    const lane = Math.floor(Math.random() * GAME_CONFIG.laneCount);
    const speed =
      GAME_CONFIG.initialSpeedPxPerSec +
      (engine.state.elapsedMs / 60000) * GAME_CONFIG.speedGainPerMinute;

    engine.state.entities.push(createEntity({ lane, speed }));
  }
}
