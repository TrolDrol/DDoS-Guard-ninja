import { useState } from 'react';

const LANE_LABELS = ['A', 'S', 'D', 'F'];

export default function LaneControls({ onLanePress, disabled, activeLane = null }) {
  const [pressedLane, setPressedLane] = useState(null);

  const handlePress = (lane) => {
    if (disabled) return;
    onLanePress(lane);

    if (navigator.vibrate) {
      navigator.vibrate(8);
    }
  };

  return (
    <div className="lane-controls" role="group" aria-label="Клавиши пианино">
      {[0, 1, 2, 3].map((lane) => {
        const isPressed = pressedLane === lane;
        const isActive = activeLane === lane;

        return (
          <button
            key={lane}
            type="button"
            className={`lane-key ${isPressed ? 'lane-key--pressed' : ''} ${
              isActive ? 'lane-key--active' : ''
            }`}
            disabled={disabled}
            aria-label={`Дорожка ${lane + 1}`}
            onPointerDown={(event) => {
              event.preventDefault();
              setPressedLane(lane);
              handlePress(lane);
            }}
            onPointerUp={() => setPressedLane(null)}
            onPointerCancel={() => setPressedLane(null)}
            onPointerLeave={() => setPressedLane((current) => (current === lane ? null : current))}
          >
            <span className="lane-key__index">Дорожка {lane + 1}</span>
            <span className="lane-key__label lane-key__label--desktop">{LANE_LABELS[lane]}</span>
            <span className="lane-key__label lane-key__label--mobile">●</span>
            <span className="lane-key__hint">Клик</span>
          </button>
        );
      })}
    </div>
  );
}
