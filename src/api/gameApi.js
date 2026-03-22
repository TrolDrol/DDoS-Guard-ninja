import { httpClient } from './httpClient';

export function startGame(userId) {
  return httpClient(`/api/startgame`, {
    method: 'POST',
    userId,
  });
}
