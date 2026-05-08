export default function ExpenseList({ gastos }) {
  if (!gastos.length) {
    return <p>No hay gastos registrados todavía.</p>;
  }

  return (
    <section className="card-list">
      {gastos.map((gasto) => (
        <article key={gasto.id} className="card-item">
          <div>
            <strong>{gasto.categoria}</strong>
            <p>{gasto.descripcion}</p>
          </div>
          <div>
            <span>{gasto.fecha}</span>
            <strong>${gasto.valor.toLocaleString()}</strong>
          </div>
        </article>
      ))}
    </section>
  );
}
