import { httpClient } from './httpClient';

export function authPlayer(payload) {
  return httpClient('/api/form/register', {
    method: 'POST',
    body: payload,
  });
}