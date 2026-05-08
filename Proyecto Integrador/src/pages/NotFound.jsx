import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="page-center">
      <section className="card-card">
        <h2>404 - Página no encontrada</h2>
        <p>La ruta que buscas no existe o requiere iniciar sesión.</p>
        <Link to="/" className="secondary-button">Volver al inicio</Link>
      </section>
    </div>
  );
}
