import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="page-center">
      <section className="card-card">
        <h2>Bienvenido a ConciliaYa</h2>
        <p>Gestiona tus datos de usuarios y controla tus gastos hormiga con rutas seguras y formularios dinámicos.</p>
        <div className="grid-buttons">
          <Link to="/login" className="primary-button">Ingresar</Link>
          <Link to="/register" className="secondary-button">Registrarme</Link>
        </div>
      </section>
    </div>
  );
}
