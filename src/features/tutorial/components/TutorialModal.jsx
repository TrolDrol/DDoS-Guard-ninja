import Modal from '../../../shared/components/Modal';
import Button from '../../../shared/components/Button';
import { useDeviceMode } from '../hooks/useDeviceMode';
import { useTutorial } from '../TutorialContext';

const enemyCards = [
  {
    key: 'green',
    title: 'Зелёная сущность',
    className: 'enemy-preview enemy-preview--green',
    description: 'Её нужно пропускать вниз. Если она пройдёт без щита — ты получишь +1 очко.',
  },
  {
    key: 'red',
    title: 'Красная сущность',
    className: 'enemy-preview enemy-preview--red',
    description: 'Опасный шар. Если он дойдёт до низа, ты потеряешь 1 жизнь.',
  },
  {
    key: 'mixed',
    title: 'Смешанная сущность',
    className: 'enemy-preview enemy-preview--mixed',
    description: 'Красная снаружи и зелёная внутри. Если пропустить её вниз — ты потеряешь 1 жизнь.',
  },
];

function DeviceInstructions({ isMobile }) {
  return (
    <div className="tutorial-step-list">
      <div className="tutorial-step glass-chip">
        <strong>1.</strong>
        <span>
          Следи за четырьмя дорожками и отличай безопасные зелёные сущности от опасных красных.
        </span>
      </div>
      <div className="tutorial-step glass-chip">
        <strong>2.</strong>
        <span>
          {isMobile
            ? 'На телефоне просто тапай по нужной дорожке прямо на игровом поле. Нижних кнопок нет.'
            : 'На десктопе нажимай клавиши A, S, D, F или кликай по нижним клавишам/самому полю в нужной колонке.'}
        </span>
      </div>
      <div className="tutorial-step glass-chip">
        <strong>3.</strong>
        <span>
          Щит уничтожает любую сущность в своей зоне. Но если щит уничтожит зелёную — ты потеряешь 1 жизнь.
        </span>
      </div>
      <div className="tutorial-step glass-chip">
        <strong>4.</strong>
        <span>
          У тебя 3 жизни и максимум 2 минуты. Набери как можно больше очков и попади в таблицу лидеров.
        </span>
      </div>
    </div>
  );
}

export default function TutorialModal() {
  const { isOpen, closeTutorial } = useTutorial();
  const { isMobile, deviceLabel } = useDeviceMode();

  return (
    <Modal
      open={isOpen}
      title="Как играть"
      onClose={closeTutorial}
      footer={
        <div className="modal-actions modal-actions--end">
          <Button onClick={closeTutorial}>Понятно, играем</Button>
        </div>
      }
    >
      <div className="tutorial-content">
        <section className="tutorial-intro glass-subpanel">
          <div>
            <span className="hero-chip">Обучение</span>
            <h3>Короткий гид для {deviceLabel}</h3>
            <p>
              Твоя задача — пропускать зелёные сущности и вовремя ставить щит против красных.
              Чем точнее играешь, тем выше счёт.
            </p>
          </div>
        </section>

        <section className="tutorial-section">
          <h4>Типы сущностей</h4>
          <div className="enemy-card-grid">
            {enemyCards.map((enemy) => (
              <article key={enemy.key} className="enemy-card glass-subpanel">
                <div className={enemy.className} aria-hidden="true">
                  <span className="enemy-preview__inner" />
                </div>
                <div className="enemy-card__body">
                  <strong>{enemy.title}</strong>
                  <p>{enemy.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="tutorial-section">
          <h4>Как играть</h4>
          <DeviceInstructions isMobile={isMobile} />
        </section>
      </div>
    </Modal>
  );
}
