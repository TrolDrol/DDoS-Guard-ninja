import { forwardRef, useEffect, useRef, useState } from 'react';

const LANE_HINTS = ['1', '2', '3', '4'];
const CANVAS_ASPECT = 7 / 12;

const GameCanvas = forwardRef(function GameCanvas(
  { onLanePress, disabled = false, activeLane = null },
  ref,
) {
  const shellRef = useRef(null);
  const [stageSize, setStageSize] = useState({ width: 420, height: 720 });

  useEffect(() => {
    if (!shellRef.current) return undefined;

    const updateSize = (width, height) => {
      if (!width || !height) return;

      let nextWidth = width;
      let nextHeight = nextWidth / CANVAS_ASPECT;

      if (nextHeight > height) {
        nextHeight = height;
        nextWidth = nextHeight * CANVAS_ASPECT;
      }

      setStageSize({
        width: Math.floor(nextWidth),
        height: Math.floor(nextHeight),
      });
    };

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      updateSize(entry.contentRect.width, entry.contentRect.height);
    });

    observer.observe(shellRef.current);
    updateSize(shellRef.current.clientWidth, shellRef.current.clientHeight);

    return () => observer.disconnect();
  }, []);

  const handlePointerDown = (event) => {
    if (disabled || !onLanePress) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const relativeX = event.clientX - rect.left;
    const laneWidth = rect.width / 4;
    const laneIndex = Math.max(0, Math.min(3, Math.floor(relativeX / laneWidth)));

    onLanePress(laneIndex);
  };

  return (
    <div className="canvas-shell" ref={shellRef}>
      <div
        className="canvas-stage"
        style={{ width: `${stageSize.width}px`, height: `${stageSize.height}px` }}
        onPointerDown={handlePointerDown}
      >
        <canvas ref={ref} className="game-canvas" />
        <div className="canvas-overlay" aria-hidden="true">
          <div className="canvas-badges">
            {LANE_HINTS.map((hint, index) => (
              <span
                key={hint}
                className={`lane-badge ${activeLane === index ? 'lane-badge--active' : ''}`}
              >
                {hint}
              </span>
            ))}
          </div>
          <div className="canvas-caption">Касайся нужной дорожки на поле</div>
        </div>
      </div>
    </div>
  );
});

export default GameCanvas;
