const USER_STORE_KEY = 'conciliaYa_users';

const defaultUsers = [
  {
    id: 'u1',
    nombres: 'Juan Camilo Ramírez',
    tipoDocumento: 'CC',
    documento: '1076543212',
    edad: 34,
    rol: 'Usuario'
  }
];

function readUsers() {
  const raw = localStorage.getItem(USER_STORE_KEY);
  if (!raw) {
    localStorage.setItem(USER_STORE_KEY, JSON.stringify(defaultUsers));
    return [...defaultUsers];
  }
  return JSON.parse(raw);
}

function saveUsers(users) {
  localStorage.setItem(USER_STORE_KEY, JSON.stringify(users));
}

export function getUsers() {
  return readUsers();
}

export function findUserByDocument(tipoDocumento, documentNumber) {
  const users = readUsers();
  return (
    users.find(
      (user) =>
        user.tipoDocumento === tipoDocumento &&
        user.documento.toString().trim() === documentNumber.toString().trim()
    ) || null
  );
}

export function registerUser(userData) {
  const users = readUsers();
  const nextUser = { id: `u${users.length + 1}`, ...userData, rol: 'Usuario' };
  users.push(nextUser);
  saveUsers(users);
  return nextUser;
}
