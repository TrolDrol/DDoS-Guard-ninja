export function drawTutorialHighlight(ctx, entity, laneX, laneY, radius) {
  if (!entity || !entity.isTutorial) return;
  
  ctx.save();
  ctx.shadowBlur = 20;
  ctx.shadowColor = 'rgba(255, 0, 106, 0.87)';
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(laneX, laneY, radius + 5, 0, Math.PI * 2);
  ctx.stroke();
  
  const pulse = Math.sin(Date.now() * 0.005) * 3;
  ctx.beginPath();
  ctx.arc(laneX, laneY, radius + 8 + pulse, 0, Math.PI * 2);
  ctx.stroke();
  
  ctx.restore();
}