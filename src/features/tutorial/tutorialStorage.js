const TUTORIAL_KEY = 'piano-shield-tutorial-seen';

export function isTutorialSeen() {
  return localStorage.getItem(TUTORIAL_KEY) === '1';
}

export function markTutorialSeen() {
  localStorage.setItem(TUTORIAL_KEY, '1');
}

export function resetTutorialSeen() {
  localStorage.removeItem(TUTORIAL_KEY);
}
