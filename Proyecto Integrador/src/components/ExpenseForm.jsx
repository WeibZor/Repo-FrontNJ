import { useState } from 'react';

export default function ExpenseForm({ onSave }) {
  const [valor, setValor] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [fecha, setFecha] = useState('');
  const [categoria, setCategoria] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!valor || !descripcion || !fecha || !categoria) {
      setError('Todos los campos son obligatorios.');
      return;
    }
    const numericValue = Number(valor);
    if (Number.isNaN(numericValue) || numericValue <= 0) {
      setError('Ingrese un valor numérico mayor a cero.');
      return;
    }

    onSave({ valor: numericValue, descripcion, fecha, categoria });
    setValor('');
    setDescripcion('');
    setFecha('');
    setCategoria('');
    setError('');
  };

  return (
    <form className="form-card" onSubmit={handleSubmit}>
      <h2>Registrar gasto hormiga</h2>
      {error && <p className="error-text">{error}</p>}
      <label>
        Valor
        <input
          type="number"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
          placeholder="Ej. 4500"
        />
      </label>
      <label>
        Descripción
        <input
          type="text"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          placeholder="Ej. Té o snack"
        />
      </label>
      <label>
        Fecha
        <input
          type="date"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
        />
      </label>
      <label>
        Categoría
        <select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
          <option value="">Selecciona una categoría</option>
          <option value="Alimentación">Alimentación</option>
          <option value="Movilidad">Movilidad</option>
          <option value="Hogar">Hogar</option>
          <option value="Otros">Otros</option>
        </select>
      </label>
      <button type="submit">Guardar gasto</button>
    </form>
  );
}
