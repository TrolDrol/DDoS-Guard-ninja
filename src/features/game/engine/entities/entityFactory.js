import { ENTITY_TYPES } from '../constants';
import { GAME_CONFIG } from '../config';

let idCounter = 0;

function chooseType(weights) {
  const roll = Math.random();
  const greenThreshold = weights.green;
  const redThreshold = weights.green + weights.red;

  if (roll <= greenThreshold) return ENTITY_TYPES.GREEN;
  if (roll <= redThreshold) return ENTITY_TYPES.RED;
  return ENTITY_TYPES.MIXED;
}

export function createEntity({ lane, speed }) {
  return {
    id: `entity_${idCounter++}`,
    lane,
    type: chooseType(GAME_CONFIG.spawnWeights),
    y: -GAME_CONFIG.entityRadius * 2,
    radius: GAME_CONFIG.entityRadius,
    speed,
  };
}
