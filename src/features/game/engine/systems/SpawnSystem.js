import { setIsTutorialGlobal } from '../../../../app/App';
import { GAME_CONFIG } from '../config';
import { ENTITY_TYPES } from '../constants';
import { createEntity } from '../entities/entityFactory';

export function updateSpawnSystem(engine, deltaMs, ticks) {
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
    
    if (engine.tutorialCompleted !== true
      && Object.values(engine.tutorialSpawned).every(value => value === true)
      && engine.ticks >= 900
    ) {
      engine.tutorialCompleted = true;
      setIsTutorialGlobal(false);
    }
    
    if (!engine.tutorialCompleted) {
      if (100 <= ticks && engine.tutorialSpawned['green'] !== true) {
        engine.state.entities.push({
          id: ticks,
          lane: 0,
          type: ENTITY_TYPES.GREEN,
          y: -GAME_CONFIG.entityRadius * 2,
          radius: GAME_CONFIG.entityRadius,
          speed: speed,
        });
        engine.tutorialSpawned['green'] = true;
      } else if (350 <= ticks && engine.tutorialSpawned['red'] !== true) {
          engine.state.entities.push({
            id: ticks,
            lane: 0,
            type: ENTITY_TYPES.RED,
            y: -GAME_CONFIG.entityRadius * 2,
            radius: GAME_CONFIG.entityRadius,
            speed: speed,
          });
          engine.tutorialSpawned['red'] = true;
      } else if (650 <= ticks && engine.tutorialSpawned['mixed'] !== true) {
          engine.state.entities.push({
            id: ticks,
            lane: 0,
            type: ENTITY_TYPES.MIXED,
            y: -GAME_CONFIG.entityRadius * 2,
            radius: GAME_CONFIG.entityRadius,
            speed: speed,
          });
          engine.tutorialSpawned['mixed'] = true;
      }
    } else {
      engine.state.entities.push(createEntity({ lane, speed }));
    }
  }
}
