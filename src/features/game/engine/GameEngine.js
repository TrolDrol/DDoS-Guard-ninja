import { GAME_OVER_REASONS, GAME_STATUS } from './constants';
import { GAME_CONFIG } from './config';
import { createInitialGameState } from './stateFactory';
import { CanvasRenderer } from './renderer/CanvasRenderer';
import { updateSpawnSystem } from './systems/SpawnSystem';
import { updateMoveSystem } from './systems/MoveSystem';
import { activateShield, updateShieldState } from './systems/ShieldSystem';
import { updateResolveMissSystem } from './systems/ResolveMissSystem';
import { updateEndGameSystem } from './systems/EndGameSystem';

export class GameEngine {
  constructor({ canvas, onStateChange, onGameOver }) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.renderer = new CanvasRenderer(this.ctx);
    this.state = createInitialGameState();
    this.onStateChange = onStateChange;
    this.onGameOver = onGameOver;
    this.animationFrameId = null;
    this.lastFrameAt = 0;
    this.spawnAccumulator = 0;
    this.lastHudSignature = '';
  }

  applyCanvasMetrics() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.canvas.width = GAME_CONFIG.width * dpr;
    this.canvas.height = GAME_CONFIG.height * dpr;
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  start() {
    this.applyCanvasMetrics();
    this.state.status = GAME_STATUS.RUNNING;
    this.state.startedAt = performance.now();
    this.lastFrameAt = performance.now();
    this.emit(true);
    this.loop();
  }

  stop() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  destroy() {
    this.stop();
  }

  pressLane(laneIndex) {
    if (this.state.status !== GAME_STATUS.RUNNING) return;
    const now = performance.now();
    activateShield(this.state, laneIndex, now);
    this.state.pulseEffects.push({
      lane: laneIndex,
      startedAt: now,
      durationMs: 280,
    });
    this.emit(true);
  }

  computeBottomImageKey() {
    if (this.state.status === GAME_STATUS.GAME_OVER) {
      return this.state.gameOverReason === GAME_OVER_REASONS.TIME_LIMIT
        ? 'final-success'
        : 'final-fail';
    }

    if (this.state.activeShieldLane !== null) return 'shield';
    if (this.state.lives <= GAME_CONFIG.bottomDangerLivesThreshold) return 'warning';
    return 'normal';
  }

  emit(force = false) {
    this.state.bottomImageKey = this.computeBottomImageKey();

    const snapshot = {
      status: this.state.status,
      score: this.state.score,
      lives: this.state.lives,
      bottomImageKey: this.state.bottomImageKey,
      startedAt: this.state.startedAt,
      finishedAt: this.state.finishedAt,
      elapsedMs: this.state.elapsedMs,
      activeShieldLane: this.state.activeShieldLane,
      gameOverReason: this.state.gameOverReason,
      timeLeftMs: Math.max(0, GAME_CONFIG.maxGameDurationMs - this.state.elapsedMs),
    };

    const signature = JSON.stringify({
      status: snapshot.status,
      score: snapshot.score,
      lives: snapshot.lives,
      bottomImageKey: snapshot.bottomImageKey,
      activeShieldLane: snapshot.activeShieldLane,
      gameOverReason: snapshot.gameOverReason,
      tick: Math.floor(snapshot.elapsedMs / 150),
    });

    if (!force && signature === this.lastHudSignature) {
      return;
    }

    this.lastHudSignature = signature;
    this.onStateChange?.(snapshot);
  }

  loop = () => {
    const now = performance.now();
    const deltaMs = Math.min(now - this.lastFrameAt, 40);
    this.lastFrameAt = now;

    if (this.state.status === GAME_STATUS.RUNNING) {
      this.state.elapsedMs = Math.min(now - this.state.startedAt, GAME_CONFIG.maxGameDurationMs);
      updateSpawnSystem(this, deltaMs);
      updateMoveSystem(this, deltaMs);
      updateShieldState(this.state, now);
      updateResolveMissSystem(this, now);
      updateEndGameSystem(this, now);
      this.state.pulseEffects = this.state.pulseEffects.filter(
        (effect) => now - effect.startedAt < effect.durationMs,
      );
    }

    this.renderer.render(this.state, now);
    this.emit();

    if (this.state.status === GAME_STATUS.GAME_OVER) {
      this.stop();
      this.onGameOver?.({
        score: this.state.score,
        durationMs: this.state.finishedAt - this.state.startedAt,
        reason: this.state.gameOverReason,
      });
      return;
    }

    this.animationFrameId = requestAnimationFrame(this.loop);
  };
}
