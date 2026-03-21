import { useAuth } from '../../auth/AuthContext';
import { useTutorial } from '../TutorialContext';

export default function TutorialButton() {
  const { isAuthorized } = useAuth();
  const { openTutorial } = useTutorial();

  if (!isAuthorized) {
    return null;
  }

  return (
    <button
      type="button"
      className="tutorial-fab"
      onClick={openTutorial}
      aria-label="Открыть обучение"
      title="Открыть обучение"
    >
      <span className="tutorial-fab__icon">?</span>
    </button>
  );
}
