import { ENTITY_TYPES } from '../constants';
import { GAME_CONFIG } from '../config';

function handleMiss(state, entity) {
  if (entity.type === ENTITY_TYPES.GREEN) {
    state.score += 1;
  } else {
    state.lives -= 1;
  }
}

function intersectsShieldZone(entity) {
  const shieldCenterY = GAME_CONFIG.height - GAME_CONFIG.shieldLineOffsetFromBottom;
  const shieldTopY = shieldCenterY - GAME_CONFIG.shieldZoneHeight / 2;
  const shieldBottomY = shieldCenterY + GAME_CONFIG.shieldZoneHeight / 2;

  return entity.y + entity.radius >= shieldTopY && entity.y - entity.radius <= shieldBottomY;
}

export function updateResolveMissSystem(engine, now) {
  const remaining = [];

  for (const entity of engine.state.entities) {
    const lane = engine.state.lanes[entity.lane];
    const isShieldActive = lane.shieldUntil > now;
    const passedBottom = entity.y - entity.radius > GAME_CONFIG.height;

    if (isShieldActive && intersectsShieldZone(entity)) {
      if (entity.type === ENTITY_TYPES.GREEN) {
        engine.state.score -= 1;
      }
      continue;
    }

    if (passedBottom) {
      handleMiss(engine.state, entity);
      continue;
    }

    remaining.push(entity);
  }

  engine.state.entities = remaining;
}
