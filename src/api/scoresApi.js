import { httpClient } from './httpClient';

export function getScores(userId) {
  return httpClient(`/api/user/${userId}`, {
    method: 'GET'
  });
}

export function setScore(userId, score) {
  return httpClient(`/api/user/${userId}/score`, {
    method: 'PUT',
    body: { score },
  });
}
