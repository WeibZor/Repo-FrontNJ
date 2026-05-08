import { useEffect, useState } from 'react';
import ExpenseForm from '../components/ExpenseForm.jsx';
import ExpenseList from '../components/ExpenseList.jsx';
import { getExpenses, addExpense } from '../services/expenseService.js';

export default function Expenses() {
  const [gastos, setGastos] = useState([]);

  useEffect(() => {
    setGastos(getExpenses());
  }, []);

  const handleSave = (expense) => {
    const next = addExpense(expense);
    setGastos(next);
  };

  return (
    <div className="page-center page-flex">
      <ExpenseForm onSave={handleSave} />
      <div className="card-card full-width">
        <h2>Lista de gastos</h2>
        <ExpenseList gastos={gastos} />
      </div>
    </div>
  );
}
