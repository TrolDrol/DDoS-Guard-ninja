import { drawBoard } from './drawBoard';
import { drawEntities } from './drawEntities';
import { drawEffects } from './drawEffects';

export class CanvasRenderer {
  constructor(ctx) {
    this.ctx = ctx;
  }

  render(state, now) {
    drawBoard(this.ctx, state);
    drawEntities(this.ctx, state.entities);
    drawEffects(this.ctx, state, now);
  }
}
