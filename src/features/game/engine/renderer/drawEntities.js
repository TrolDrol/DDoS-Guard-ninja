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
    outerColor: '#1dd75f',
    innerColor: '#ff4d6d',
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

function drawImageOrb(ctx, img, x, y, radius) {
  if (!img || !img.complete) return;

  const size = radius * 2;
  ctx.save();
  ctx.shadowBlur = 12;
  ctx.shadowColor = 'rgba(0,0,0,0.3)';
  ctx.drawImage(
    img,
    x - radius,
    y - radius,
    size,
    size
  );
  ctx.restore();
}

export function drawEntitiesImage(ctx, entities, images) {
  for (const entity of entities) {
    const x = laneCenter(entity.lane);

    if (images !== undefined && images[entity.type] && images[entity.type].complete) {
      drawImageOrb(ctx, images[entity.type], x, entity.y, entity.radius);
      continue;
    }
    else if (entity.type === ENTITY_TYPES.RED) {
      drawOrb(ctx, {
        x,
        y: entity.y,
        radius: entity.radius,
        outerColor: '#ef4444',
        innerColor: '#fda4af',
      });
      continue;
    }
    else if (entity.type === ENTITY_TYPES.GREEN) {
      drawOrb(ctx, {
        x, y: entity.y,
        radius: entity.radius,
        outerColor: '#2ef245',
        innerColor: '#97eaa9',
      });
      continue;
    }

    drawMixedBall(ctx, x, entity.y, entity.radius);
  }
}


// import { ENTITY_TYPES } from '../constants';
// import { GAME_CONFIG } from '../config';

// const images = {};
// let imagesLoaded = false;
// let loadPromise = null;

// export const initEntityImages = () => {
//   if (loadPromise) return loadPromise;
  
//   const imagePromises = [];
  
//   Object.values(ENTITY_TYPES).forEach(type => {
//     const img = new Image();
//     const promise = new Promise((resolve) => {
//       img.onload = () => {
//         console.log(`Loaded: ${type}`);
//         resolve({ type, img });
//       };
//       img.onerror = () => {
//         console.error(`Failed to load: images/${type}.jpg`);
//         resolve({ type, img: null });
//       };
//     });
//     img.src = `images/${type}.jpg`;
//     imagePromises.push(promise);
//     images[type] = img;
//   });
  
//   loadPromise = Promise.all(imagePromises).then(() => {
//     imagesLoaded = true;
//     return images;
//   });
  
//   return loadPromise;
// };

// export const getEntityImage = (type) => {
//   return images[type];
// };

// export const areImagesLoaded = () => imagesLoaded;

// function laneCenter(laneIndex) {
//   const laneWidth = GAME_CONFIG.width / GAME_CONFIG.laneCount;
//   return laneWidth * laneIndex + laneWidth / 2;
// }

// function drawImageOrb(ctx, img, x, y, radius) {
//   if (!img || !img.complete) return;

//   const size = radius * 2;
//   ctx.save();
//   ctx.shadowBlur = 12;
//   ctx.shadowColor = 'rgba(0,0,0,0.3)';
//   ctx.drawImage(
//     img,
//     x - radius,
//     y - radius,
//     size,
//     size
//   );
//   ctx.restore();
// }

// export function drawEntities(ctx, entities) {
//   const imagesLoaded = areImagesLoaded();
  
//   for (const entity of entities) {
//     const x = laneCenter(entity.lane);
//     const img = getEntityImage(entity.type);
    
//     if (imagesLoaded && img && img.complete) {
//       const size = entity.radius * 2;
//       ctx.drawImage(
//         img,
//         x - entity.radius,
//         entity.y - entity.radius,
//         size,
//         size
//       );
//     } else {
//       ctx.fillStyle = entity.type === ENTITY_TYPES.GREEN ? '#22c55e' : 
//                       entity.type === ENTITY_TYPES.RED ? '#ef4444' : '#ff4d6d';
//       ctx.beginPath();
//       ctx.arc(x, entity.y, entity.radius, 0, Math.PI * 2);
//       ctx.fill();
//     }
//   }
// }