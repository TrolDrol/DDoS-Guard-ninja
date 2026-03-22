import { drawBoard } from './drawBoard';
import { drawEntitiesImage } from './drawEntities';
import { drawEffects } from './drawEffects';
import { drawTutorialImage } from './drawTutorialScreens';
import { getIsTutorialGlobal } from '../../../../app/App';

export class CanvasRenderer {
  constructor(ctx) {
    this.ctx = ctx;
  }

  render(state, now, images, ticks, tutorialSpawned) {
    drawBoard(this.ctx, state);
    if (!getIsTutorialGlobal())
      drawTutorialImage(this.ctx, ticks, tutorialSpawned, images);
    drawEntitiesImage(this.ctx, state.entities, images);
    drawEffects(this.ctx, state, now);
  }
}
