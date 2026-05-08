import { getUserFromStorage } from './storageService.js';

const initialExpenses = [
  {
    id: 'e1',
    valor: 12000,
    descripcion: 'Café en corrientazo',
    fecha: '2026-04-28',
    categoria: 'Alimentación'
  },
  {
    id: 'e2',
    valor: 5500,
    descripcion: 'Recarga de metro',
    fecha: '2026-04-25',
    categoria: 'Movilidad'
  },
  {
    id: 'e3',
    valor: 8000,
    descripcion: 'Panadería y domicilio',
    fecha: '2026-04-24',
    categoria: 'Hogar'
  }
];

const EXPENSE_KEY = 'conciliaYa_expenses';

export function getExpenses() {
  const saved = localStorage.getItem(EXPENSE_KEY);
  if (saved) {
    return JSON.parse(saved);
  }
  localStorage.setItem(EXPENSE_KEY, JSON.stringify(initialExpenses));
  return [...initialExpenses];
}

export function addExpense(expense) {
  const current = getExpenses();
  const next = [...current, { ...expense, id: `e${current.length + 1}` }];
  localStorage.setItem(EXPENSE_KEY, JSON.stringify(next));
  return next;
}

export function getCurrentUserExpenses() {
  const user = getUserFromStorage();
  if (!user) return [];
  return getExpenses().map((expense) => ({ ...expense, usuario: user.documento }));
}
