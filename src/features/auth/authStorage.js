// const AUTH_KEY = 'piano-shield-auth';
// const DEVICE_KEY = 'piano-shield-device-id';

// export function loadAuth() {
//   const raw = localStorage.getItem(AUTH_KEY);
//   if (!raw) return null;

//   try {
//     return JSON.parse(raw);
//   } catch {
//     return null;
//   }
// }

// export function saveAuth(auth) {
//   localStorage.setItem(AUTH_KEY, JSON.stringify(auth));
// }

// export function clearAuth() {
//   localStorage.removeItem(AUTH_KEY);
// }

export function getOrCreateDeviceId() {
  const saved = localStorage.getItem(DEVICE_KEY);
  if (saved) return saved;

  const deviceId =
    globalThis.crypto?.randomUUID?.() ??
    `device_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

  localStorage.setItem(DEVICE_KEY, deviceId);
  return deviceId;
}

// authStorage.js
const STORAGE_KEY = 'auth_data';

export const saveAuth = (authData) => {
  if (authData) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(authData));
  } else {
    localStorage.removeItem(STORAGE_KEY);
  }
};

export const loadAuth = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Failed to load auth:', error);
  }
  return null;
};

export const clearAuth = () => {
  localStorage.removeItem(STORAGE_KEY);
};