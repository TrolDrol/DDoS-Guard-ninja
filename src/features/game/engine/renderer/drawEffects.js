import { GAME_CONFIG } from '../config';

const shieldImage = new Image();
shieldImage.src = 'images/shield.svg';
let imageLoaded = false;

shieldImage.onload = () => {
  imageLoaded = true;
};
export function drawEffects(ctx, state, now) {
  const laneWidth = GAME_CONFIG.width / GAME_CONFIG.laneCount;
  const shieldCenterY = GAME_CONFIG.height - GAME_CONFIG.shieldLineOffsetFromBottom;
  const shieldTopY = shieldCenterY - GAME_CONFIG.shieldZoneHeight / 2;

  state.lanes.forEach((lane, index) => {
    if (lane.shieldUntil <= now) return;

    const x = index * laneWidth;
    const remainingRatio = Math.max(0, Math.min(1, (lane.shieldUntil - now) / GAME_CONFIG.shieldDurationMs));

    const fill = ctx.createLinearGradient(x, shieldTopY, x, shieldTopY + GAME_CONFIG.shieldZoneHeight);
    fill.addColorStop(0, 'rgba(255,255,255,0.18)');
    fill.addColorStop(0.45, 'rgba(125, 211, 252, 0.34)');
    fill.addColorStop(1, 'rgba(34, 197, 94, 0.20)');

    ctx.fillStyle = fill;
    ctx.fillRect(
      x + GAME_CONFIG.shieldZoneInsetX,
      shieldTopY,
      laneWidth - GAME_CONFIG.shieldZoneInsetX * 2,
      GAME_CONFIG.shieldZoneHeight,
    );

    ctx.strokeStyle = `rgba(191, 219, 254, ${0.55 + remainingRatio * 0.25})`;
    ctx.lineWidth = 3;
    ctx.strokeRect(
      x + GAME_CONFIG.shieldZoneInsetX + 2,
      shieldTopY + 2,
      laneWidth - GAME_CONFIG.shieldZoneInsetX * 2 - 4,
      GAME_CONFIG.shieldZoneHeight - 4,
    );

    if (imageLoaded && shieldImage.complete) {
      const imgWidth = 60;
      const imgHeight = 65;
      ctx.drawImage(
        shieldImage,
        x + laneWidth / 2 - imgWidth / 2,
        shieldCenterY - imgHeight / 2,
        imgWidth,
        imgHeight
      );
    } else {
      ctx.fillStyle = 'rgba(239, 246, 255, 0.95)';
      ctx.font = '700 14px Inter, Arial';
      ctx.fillText('ЩИТ', x + laneWidth / 2 - 19, shieldCenterY + 5);
    }
  });

  state.pulseEffects.forEach((effect) => {
    const progress = (now - effect.startedAt) / effect.durationMs;
    if (progress >= 1) return;

    const x = effect.lane * laneWidth + laneWidth / 2;
    const baseRadius = 22 + progress * 34;
    ctx.save();
    ctx.strokeStyle = `rgba(125, 211, 252, ${0.4 - progress * 0.35})`;
    ctx.lineWidth = 6 - progress * 4;
    ctx.beginPath();
    ctx.arc(x, GAME_CONFIG.height - 44, baseRadius, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  });

  const vignette = ctx.createLinearGradient(0, 0, 0, GAME_CONFIG.height);
  vignette.addColorStop(0, 'rgba(255,255,255,0.02)');
  vignette.addColorStop(0.65, 'rgba(255,255,255,0)');
  vignette.addColorStop(1, 'rgba(8,17,31,0.28)');
  ctx.fillStyle = vignette;
  ctx.fillRect(0, 0, GAME_CONFIG.width, GAME_CONFIG.height);
}