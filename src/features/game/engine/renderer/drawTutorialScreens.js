import { TUTORIAL_STEPS } from "../../../tutorial/TutorialContext";
import { GAME_CONFIG } from "../config";

export const STEP_CONTENT = {
  [TUTORIAL_STEPS.GREEN_ENEMY]: {
    title: 'Зелёная сущность',
    description: "Это полезные пакеты данных\nИх нужно пропускать на сервер\nЗа это вы получите +1 очко",
    action: 'Пропусти её, нажав на эту дорожку',
    hint: 'Просто нажми на дорожку или используй клавишу'
  },
  [TUTORIAL_STEPS.RED_ENEMY]: {
    title: 'Красная сущность',
    description: 'Это DDoS-атака\nЕсли пропустить такую вы потеряете 1 жизнь',
    action: 'Активируй щит, чтобы уничтожить её',
    hint: 'Нажми на эту дорожку, когда сущность будет внизу'
  },
  [TUTORIAL_STEPS.SHIELD]: {
    title: 'Защитный щит',
    description: 'Щит уничтожает ВСЕ сущности в своей зоне. Но будь осторожен: если щит уничтожит зелёную сущность, ты потеряешь жизнь!',
    action: 'Поставь щит, когда красная сущность будет близко к низу',
    hint: 'Нажми на дорожку, чтобы активировать щит'
  },
  [TUTORIAL_STEPS.MIXED_ENEMY]: {
    title: 'Смешанная сущность',
    description: 'Это бот\nОн пришел поломать ваш сайт\nНе пропускайте его!',
    action: 'Уничтожь её щитом, когда она будет близко',
    hint: 'Не пропускай её вниз, используй щит'
  }
};

function drawTutorialImageWithText(ctx, x, y, radius, text = '') {
  if (!text) {
    ctx.restore();
    return;
  }

  ctx.save();
  
  const fontSize = Math.floor(radius * 0.6);
  const padding = fontSize * 0.4;
  const borderRadius = fontSize * 0.2;
  
  ctx.font = `${fontSize}px "Open Sans", sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  
  const lines = text.split('\n').filter(l => l.trim());
  if (lines.length === 0) {
    ctx.restore();
    return;
  }
  
  let maxWidth = 0;
  lines.forEach(line => {
    maxWidth = Math.max(maxWidth, ctx.measureText(line).width);
  });
  
  const blockWidth = maxWidth + padding * 3;
  const blockHeight = lines.length * fontSize * 1.2 + padding * 3;
  const blockX = x - blockWidth / 2;
  const blockY = y - blockHeight / 2;
  
  // Фон
  ctx.shadowBlur = 0;
  ctx.beginPath();
  ctx.roundRect(blockX, blockY, blockWidth, blockHeight, borderRadius);
  ctx.fillStyle = 'rgba(17, 21, 29, 0.9)'; // --bg-dark
  ctx.fill();
  
  // Градиентная обводка
  // const strokeGradient = ctx.createLinearGradient(blockX, blockY, blockX + blockWidth, blockY);
  // Это просто офигенный стиль, но не подходит под фирменный :(
  // strokeGradient.addColorStop(0, 'rgba(255, 215, 0, 0.8)');
  // strokeGradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.9)');
  // strokeGradient.addColorStop(1, 'rgba(255, 215, 0, 0.8)');

  // Синяя обводка
  ctx.strokeStyle = '#0077ff'; // --bg
  ctx.lineWidth = 2;
  ctx.stroke();

  const circleRadius = fontSize * 0.7;
  const circleX = blockX + blockWidth - circleRadius * 0.5;
  const circleY = blockY + circleRadius - circleRadius * 0.5;
  
  // Фон кружка
  ctx.beginPath();
  ctx.arc(circleX, circleY, circleRadius, 0, Math.PI * 2);
  ctx.fillStyle = '#0077ff'; // --bg
  ctx.fill();
  
  // Обводка кружка
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 1.5;
  ctx.stroke();
  
  // Знак вопроса
  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.shadowBlur = 0; // убираем тень для знака вопроса
  ctx.fillText('?', circleX, circleY);
  
  // Текст с градиентом
  const startY = blockY + padding + fontSize * 0.6;
  const textGradient = ctx.createLinearGradient(x - 30, startY, x + 30, startY + blockHeight);
  textGradient.addColorStop(0, '#ffffff');
  textGradient.addColorStop(1, '#f2f7ff'); // --bg-lite
  
  ctx.fillStyle = textGradient;
  ctx.shadowBlur = 4;
  ctx.shadowColor = '#0077ff';
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
  
  lines.forEach((line, index) => {
    ctx.fillText(line, x, startY + index * fontSize * 1.2);
  });
  
  ctx.restore();
}

const startY = 300;
const startX = 250;

export function drawTutorialImage(ctx, ticks) {
  if (150 <= ticks && ticks <= 400) {
    drawTutorialImageWithText(
      ctx,
      startX, startY,
          GAME_CONFIG.entityRadius,
          STEP_CONTENT[TUTORIAL_STEPS.GREEN_ENEMY].description
    );
  } else if (400 <= ticks && ticks <= 700) {
    drawTutorialImageWithText(
      ctx,
      startX, startY,
          GAME_CONFIG.entityRadius,
          STEP_CONTENT[TUTORIAL_STEPS.RED_ENEMY].description
    );
  } else if (700 <= ticks && ticks <= 1000) {
    drawTutorialImageWithText(
      ctx,
      startX, startY,
          GAME_CONFIG.entityRadius,
          STEP_CONTENT[TUTORIAL_STEPS.MIXED_ENEMY].description
    );
    }
}