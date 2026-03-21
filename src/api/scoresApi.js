import { httpClient } from './httpClient';

export function getScores(token) {
  return httpClient('/v1/getScores', {
    method: 'GET',
    token,
  });
}

export function setScore(token, payload) {
  return httpClient('/v1/setScore', {
    method: 'POST',
    token,
    body: payload,
  });
}
