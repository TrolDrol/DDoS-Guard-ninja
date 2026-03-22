import { GAME_CONFIG } from '../config';

export function drawBoard(ctx, state) {
  const laneWidth = GAME_CONFIG.width / GAME_CONFIG.laneCount;
  const gradient = ctx.createLinearGradient(0, 0, 0, GAME_CONFIG.height);
  gradient.addColorStop(0, '#0f1d3d');
  gradient.addColorStop(0.55, '#0a1326');
  gradient.addColorStop(1, '#08111f');

  ctx.clearRect(0, 0, GAME_CONFIG.width, GAME_CONFIG.height);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, GAME_CONFIG.width, GAME_CONFIG.height);

  const glow = ctx.createRadialGradient(
    GAME_CONFIG.width * 0.5,
    GAME_CONFIG.height * 0.18,
    24,
    GAME_CONFIG.width * 0.5,
    GAME_CONFIG.height * 0.18,
    GAME_CONFIG.width * 0.65,
  );
  glow.addColorStop(0, 'rgba(96, 165, 250, 0.20)');
  glow.addColorStop(1, 'rgba(96, 165, 250, 0)');
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, GAME_CONFIG.width, GAME_CONFIG.height);

  for (let laneIndex = 0; laneIndex < GAME_CONFIG.laneCount; laneIndex += 1) {
    const x = laneIndex * laneWidth;
    const isActive = state.activeShieldLane === laneIndex;

    const laneGradient = ctx.createLinearGradient(x, 0, x + laneWidth, GAME_CONFIG.height);
    laneGradient.addColorStop(0, laneIndex % 2 === 0 ? 'rgba(255,255,255,0.085)' : 'rgba(255,255,255,0.035)');
    laneGradient.addColorStop(0.5, isActive ? 'rgba(125, 211, 252, 0.16)' : 'rgba(255,255,255,0.02)');
    laneGradient.addColorStop(1, 'rgba(255,255,255,0.035)');

    ctx.fillStyle = laneGradient;
    ctx.fillRect(x, 0, laneWidth, GAME_CONFIG.height);

    ctx.strokeStyle = 'rgba(255,255,255,0.12)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, GAME_CONFIG.height);
    ctx.stroke();

    ctx.fillStyle = 'rgba(255,255,255,0.09)';
    ctx.fillRect(x + 10, 12, laneWidth - 20, 5);
  }

  ctx.strokeStyle = 'rgba(255,255,255,0.18)';
  ctx.beginPath();
  ctx.moveTo(GAME_CONFIG.width, 0);
  ctx.lineTo(GAME_CONFIG.width, GAME_CONFIG.height);
  ctx.stroke();

  const shieldCenterY = GAME_CONFIG.height - GAME_CONFIG.shieldLineOffsetFromBottom;
  const shieldTopY = shieldCenterY - GAME_CONFIG.shieldZoneHeight / 2;
  const shieldBottomY = shieldCenterY + GAME_CONFIG.shieldZoneHeight / 2;

  const shieldGradient = ctx.createLinearGradient(0, shieldTopY, 0, shieldBottomY);
  shieldGradient.addColorStop(0, 'rgba(34, 197, 94, 0.08)');
  shieldGradient.addColorStop(0.5, 'rgba(125, 211, 252, 0.12)');
  shieldGradient.addColorStop(1, 'rgba(34, 197, 94, 0.08)');

  ctx.fillStyle = shieldGradient;
  ctx.fillRect(0, shieldTopY, GAME_CONFIG.width, GAME_CONFIG.shieldZoneHeight);

  ctx.setLineDash([8, 7]);
  ctx.strokeStyle = 'rgba(191, 219, 254, 0.22)';
  ctx.lineWidth = 2;
  ctx.strokeRect(0, shieldTopY, GAME_CONFIG.width, GAME_CONFIG.shieldZoneHeight);
  ctx.setLineDash([]);
}
