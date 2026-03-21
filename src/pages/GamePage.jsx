import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useGame } from '../features/game/hooks/useGame';
import { useLaneInput } from '../features/game/hooks/useLaneInput';
import { useAuth } from '../features/auth/AuthContext';
import GameCanvas from '../features/game/components/GameCanvas';
import GameHud from '../features/game/components/GameHud';
import LaneControls from '../features/game/components/LaneControls';
import BottomStateImage from '../features/game/components/BottomStateImage';
import ResultModal from '../features/game/components/ResultModal';
import { ENTITY_TYPES } from '../features/game/engine/constants';

export default function GamePage({ images }) {
  const { isAuthorized } = useAuth();
  const canvasRef = useRef(null);

  const { hud, pressLane, restart, goHome, result, submitState } = useGame(canvasRef, images);

  useLaneInput(pressLane);

  if (!isAuthorized) {
    return (
      <main className="page page-auth">
        <section className="card">
          <h1>Нужно зарегистрироваться</h1>
          <p>Сначала вернись на главную страницу и пройди регистрацию игрока.</p>
          <Link to="/" className="btn">
            На главную
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="page page-game">
      <div className="game-row game-row--hud">
        <GameHud score={hud.score} lives={hud.lives} timeLeftMs={hud.timeLeftMs} />
      </div>

      <section className="glass-panel game-stage-card game-row game-row--stage">
        <GameCanvas
          ref={canvasRef}
          disabled={hud.status === 'gameOver'}
          activeLane={hud.activeShieldLane}
          onLanePress={pressLane}
        />
      </section>

      <div className="game-row game-row--controls">
        <LaneControls
          disabled={hud.status === 'gameOver'}
          activeLane={hud.activeShieldLane}
          onLanePress={pressLane}
        />
      </div>
      <div className="game-row game-row--bottom">
        <BottomStateImage stateKey={hud.bottomImageKey} />
      </div>

      <ResultModal
        open={result.open}
        score={hud.score}
        isSuccess={result.isSuccess}
        isSubmitting={submitState.isSubmitting}
        submitError={submitState.error}
        onRetry={restart}
        onHome={goHome}
      />
    </main>
  );
}
