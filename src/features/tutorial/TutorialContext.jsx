import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import { isTutorialSeen, markTutorialSeen } from './tutorialStorage';

const TutorialContext = createContext(null);

export const TUTORIAL_STEPS = {
NONE: 'none',
GREEN_ENEMY: 'green_enemy',
RED_ENEMY: 'red_enemy',
SHIELD: 'shield',
MIXED_ENEMY: 'mixed_enemy',
COMPLETE: 'complete'
};

export function TutorialProvider({ children }) {
  const { isAuthorized } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isAuthorized) {
      setIsOpen(false);
      return;
    }

    if (!isTutorialSeen()) {
      setIsOpen(true);
    }
  }, [isAuthorized]);

  const openTutorial = () => setIsOpen(true);
  const closeTutorial = () => {
    markTutorialSeen();
    setIsOpen(false);
  };

  const value = useMemo(
    () => ({ isOpen, openTutorial, closeTutorial }),
    [isOpen],
  );

  return <TutorialContext.Provider value={value}>{children}</TutorialContext.Provider>;
}

export function useTutorial() {
  const value = useContext(TutorialContext);

  if (!value) {
    throw new Error('useTutorial must be used inside TutorialProvider');
  }

  return value;
}