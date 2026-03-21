import { httpClient } from './httpClient';

export function startGame(token) {
  return httpClient('/v1/startGame', {
    method: 'POST',
    token,
  });
}
