import { useEffect } from 'react';

const keyMap = {
  Digit1: 0,
  Digit2: 1,
  Digit3: 2,
  Digit4: 3,
  KeyA: 0,
  KeyS: 1,
  KeyD: 2,
  KeyF: 3,
  ArrowLeft: 0,
  ArrowUp: 1,
  ArrowDown: 2,
  ArrowRight: 3,
};

export function useLaneInput(onLanePress) {
  useEffect(() => {
    function handleKeyDown(event) {
      const lane = keyMap[event.code];
      if (lane === undefined) return;
      event.preventDefault();
      onLanePress(lane);
    }

    window.addEventListener('keydown', handleKeyDown, { passive: false });
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onLanePress]);
}
