const AUTH_KEY = 'piano-shield-auth';
const DEVICE_KEY = 'piano-shield-device-id';

export function loadAuth() {
  const raw = localStorage.getItem(AUTH_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function saveAuth(auth) {
  localStorage.setItem(AUTH_KEY, JSON.stringify(auth));
}

export function clearAuth() {
  localStorage.removeItem(AUTH_KEY);
}

export function getOrCreateDeviceId() {
  const saved = localStorage.getItem(DEVICE_KEY);
  if (saved) return saved;

  const deviceId =
    globalThis.crypto?.randomUUID?.() ??
    `device_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

  localStorage.setItem(DEVICE_KEY, deviceId);
  return deviceId;
}
