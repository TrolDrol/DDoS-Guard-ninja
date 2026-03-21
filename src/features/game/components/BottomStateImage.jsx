const IMAGE_MAP = {
  normal: '/images/bottom-states/normal.svg',
  warning: '/images/bottom-states/warning.svg',
  shield: '/images/bottom-states/shield.svg',
  'final-success': '/images/bottom-states/final-success.svg',
  'final-fail': '/images/bottom-states/final-fail.svg',
};

export default function BottomStateImage({ stateKey }) {
  const src = IMAGE_MAP[stateKey] ?? IMAGE_MAP.normal;

  return (
    <div className="bottom-state-card">
      <img src={src} alt="Текущее состояние игры" />
    </div>
  );
}
