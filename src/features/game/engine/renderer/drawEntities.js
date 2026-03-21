import { ENTITY_TYPES } from '../constants';
import { GAME_CONFIG } from '../config';

function laneCenter(laneIndex) {
  const laneWidth = GAME_CONFIG.width / GAME_CONFIG.laneCount;
  return laneWidth * laneIndex + laneWidth / 2;
}

function drawOrb(ctx, { x, y, radius, outerColor, innerColor, ringColor = 'rgba(255,255,255,0.28)' }) {
  ctx.save();
  ctx.shadowColor = outerColor;
  ctx.shadowBlur = 22;

  const base = ctx.createRadialGradient(x - radius * 0.35, y - radius * 0.45, radius * 0.2, x, y, radius);
  base.addColorStop(0, 'rgba(255,255,255,0.98)');
  base.addColorStop(0.16, innerColor);
  base.addColorStop(0.72, outerColor);
  base.addColorStop(1, 'rgba(255,255,255,0.12)');

  ctx.fillStyle = base;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();

  ctx.shadowBlur = 0;
  ctx.strokeStyle = ringColor;
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.arc(x, y, radius - 1, 0, Math.PI * 2);
  ctx.stroke();

  ctx.fillStyle = 'rgba(255,255,255,0.42)';
  ctx.beginPath();
  ctx.ellipse(x - radius * 0.3, y - radius * 0.35, radius * 0.28, radius * 0.18, -0.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawMixedBall(ctx, x, y, radius) {
  drawOrb(ctx, {
    x,
    y,
    radius,
    outerColor: '#ff4d6d',
    innerColor: '#1dd75f',
    ringColor: 'rgba(255,255,255,0.34)',
  });

  ctx.save();
  ctx.shadowColor = '#1dd75f';
  ctx.shadowBlur = 18;
  ctx.fillStyle = 'rgba(29, 215, 95, 0.92)';
  ctx.beginPath();
  ctx.arc(x, y, radius * 0.45, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

export function drawEntities(ctx, entities) {
  for (const entity of entities) {
    const x = laneCenter(entity.lane);

    if (entity.type === ENTITY_TYPES.GREEN) {
      drawOrb(ctx, {
        x,
        y: entity.y,
        radius: entity.radius,
        outerColor: '#22c55e',
        innerColor: '#86efac',
      });
      continue;
    }

    if (entity.type === ENTITY_TYPES.RED) {
      drawOrb(ctx, {
        x,
        y: entity.y,
        radius: entity.radius,
        outerColor: '#ef4444',
        innerColor: '#fda4af',
      });
      continue;
    }

    drawMixedBall(ctx, x, entity.y, entity.radius);
  }
}
