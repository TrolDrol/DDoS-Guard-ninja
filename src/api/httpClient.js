import { getOrCreateDeviceId } from '../features/auth/authStorage';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001';

async function parseResponse(response) {
  const contentType = response.headers.get('content-type') ?? '';

  if (contentType.includes('application/json')) {
    return response.json();
  }

  return response.text();
}

export async function httpClient(path, options = {}) {
  const { token, headers = {}, body, ...rest } = options;

  const response = await fetch(`${API_URL}${path}`, {
    ...rest,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const payload = await parseResponse(response);

  if (!response.ok) {
    const message =
      typeof payload === 'object' && payload?.error
        ? payload.error
        : 'Ошибка запроса';
    const error = new Error(message);
    error.status = response.status;
    error.payload = payload;
    throw error;
  }

  return payload;
}
