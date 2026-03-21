import { drawBoard } from './drawBoard';
import { drawEntitiesImage } from './drawEntities';
import { drawEffects } from './drawEffects';

export class CanvasRenderer {
  constructor(ctx) {
    this.ctx = ctx;
  }

  render(state, now, images) {
    drawBoard(this.ctx, state);
    drawEntitiesImage(this.ctx, state.entities, images);
    drawEffects(this.ctx, state, now);
  }
}
