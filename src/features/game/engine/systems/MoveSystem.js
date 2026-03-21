export function updateMoveSystem(engine, deltaMs) {
  const deltaSec = deltaMs / 1000;

  engine.state.entities = engine.state.entities.map((entity) => ({
    ...entity,
    y: entity.y + entity.speed * deltaSec,
  }));
}
