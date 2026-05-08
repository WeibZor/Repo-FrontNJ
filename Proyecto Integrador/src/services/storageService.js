const USER_KEY = 'conciliaYa_user';

export function saveSession(user) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function removeSession() {
  localStorage.removeItem(USER_KEY);
}

export function getUserFromStorage() {
  const raw = localStorage.getItem(USER_KEY);
  return raw ? JSON.parse(raw) : null;
}
