import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { startGame } from '../../../api/gameApi';
import { setScore } from '../../../api/scoresApi';
import { useAuth } from '../../auth/AuthContext';
import { GAME_OVER_REASONS } from '../engine/constants';
import { GameEngine } from '../engine/GameEngine';

const initialHud = {
  status: 'idle',
  score: 0,
  lives: 3,
  bottomImageKey: 'normal',
  elapsedMs: 0,
  activeShieldLane: null,
  gameOverReason: null,
  timeLeftMs: 2 * 60 * 1000,
};

export function useGame(canvasRef) {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const engineRef = useRef(null);
  const sessionIdRef = useRef('');
  const [hud, setHud] = useState(initialHud);
  const [sessionId, setSessionId] = useState('');
  const [submitState, setSubmitState] = useState({
    isSubmitting: false,
    submitted: false,
    error: '',
  });

  const onGameOver = useCallback(
    async ({ score, durationMs }) => {
      const currentSessionId = sessionIdRef.current;

      if (!auth?.token || !currentSessionId) {
        setSubmitState({
          isSubmitting: false,
          submitted: true,
          error: 'Не найден игровой сеанс',
        });
        return;
      }

      try {
        setSubmitState({ isSubmitting: true, submitted: false, error: '' });
        await setScore(auth.token, {
          sessionId: currentSessionId,
          score,
          durationMs,
        });
        setSubmitState({ isSubmitting: false, submitted: true, error: '' });
      } catch (error) {
        setSubmitState({
          isSubmitting: false,
          submitted: true,
          error: error.message || 'Не удалось сохранить счёт',
        });
      }
    },
    [auth?.token],
  );

  const boot = useCallback(async () => {
    if (!auth?.token || !canvasRef.current) return;

    try {
      const { sessionId: nextSessionId } = await startGame(auth.token);
      sessionIdRef.current = nextSessionId;
      setSessionId(nextSessionId);

      const engine = new GameEngine({
        canvas: canvasRef.current,
        onStateChange: setHud,
        onGameOver,
      });

      engineRef.current = engine;
      engine.start();
    } catch (error) {
      setSubmitState({
        isSubmitting: false,
        submitted: true,
        error: error.message || 'Не удалось начать игру',
      });
    }
  }, [auth?.token, canvasRef, onGameOver]);

  useEffect(() => {
    boot();

    return () => {
      engineRef.current?.destroy();
    };
  }, [boot]);

  const pressLane = useCallback((laneIndex) => {
    engineRef.current?.pressLane(laneIndex);
  }, []);

  const restart = useCallback(() => {
    engineRef.current?.destroy();
    sessionIdRef.current = '';
    setHud(initialHud);
    setSessionId('');
    setSubmitState({ isSubmitting: false, submitted: false, error: '' });
    boot();
  }, [boot]);

  const goHome = useCallback(() => {
    navigate('/');
  }, [navigate]);

  const result = useMemo(
    () => ({
      open: hud.status === 'gameOver',
      isSuccess: hud.gameOverReason === GAME_OVER_REASONS.TIME_LIMIT,
      sessionId,
    }),
    [hud.gameOverReason, hud.status, sessionId],
  );

  return {
    hud,
    pressLane,
    restart,
    goHome,
    result,
    submitState,
  };
}
