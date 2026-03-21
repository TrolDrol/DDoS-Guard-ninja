import { httpClient } from './httpClient';

export function authPlayer(payload) {
  return httpClient('/v1/auth', {
    method: 'POST',
    body: payload,
  });
}
