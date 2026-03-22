import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { startGame } from '../../../api/gameApi';
import { setScore } from '../../../api/scoresApi';
import { useAuth } from '../../auth/AuthContext';
import { GAME_OVER_REASONS } from '../engine/constants';
import { GameEngine } from '../engine/GameEngine';
import { ENTITY_TYPES } from '../engine/constants';
import { setIsTutorialGlobal } from '../../../app/App';

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

export function useGame(canvasRef, images) {
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

  const areImagesLoaded = useMemo(() => {
    const requiredTypes = [ENTITY_TYPES.RED, ENTITY_TYPES.GREEN, ENTITY_TYPES.MIXED];
    
    return requiredTypes.every(type => {
      const img = images[type];
      return img && img.complete && img.naturalWidth > 0;
    });
  }, [images]);

  const onGameOver = useCallback(
    async ({ score, durationMs }) => {
      const currentSessionId = sessionIdRef.current;
      if (!auth?.user_id || false) {
        setSubmitState({
          isSubmitting: false,
          submitted: true,
          error: 'Не найден игровой сеанс',
        });
        return;
      }

      try {
        setSubmitState({ isSubmitting: true, submitted: false, error: '' });
        await setScore(auth.user_id, 
          score);
        setSubmitState({ isSubmitting: false, submitted: true, error: '' });
      } catch (error) {
        setSubmitState({
          isSubmitting: false,
          submitted: true,
          error: error.message || 'Не удалось сохранить счёт',
        });
      }
    },
    [auth?.user_id],
  );

  const boot = useCallback(async () => {
    
    if (!areImagesLoaded) {
      return;
    }

    if (!auth?.user_id || !canvasRef.current) {
      return;
    }

    try {
      const { sessionId: nextSessionId } = await startGame(auth.user_id);
      sessionIdRef.current = nextSessionId;
      setSessionId(nextSessionId);
      
      const engine = new GameEngine({
        canvas: canvasRef.current,
        onStateChange: setHud,
        onGameOver,
        images
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
  }, [auth?.user_id, canvasRef, onGameOver, areImagesLoaded, images]);

  useEffect(() => {
    if (areImagesLoaded) {
      boot();
    }
  }, [areImagesLoaded, boot]);

  useEffect(() => {
    return () => {
      engineRef.current?.destroy();
    };
  }, []);

  const pressLane = useCallback((laneIndex) => {
    engineRef.current?.pressLane(laneIndex);
  }, []);

  const restart = useCallback(() => {
    engineRef.current?.destroy();
    sessionIdRef.current = '';
    setHud(initialHud);
    setSessionId('');
    setSubmitState({ isSubmitting: false, submitted: false, error: '' });
    setIsTutorialGlobal(false);
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
    imagesLoaded: areImagesLoaded,
  };
}