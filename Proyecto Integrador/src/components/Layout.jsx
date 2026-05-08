import { Link, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import logo from '../assets/logo.svg';

export default function Layout() {
  const { user, logout } = useAuth();

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="brand-row">
          <img src={logo} alt="ConciliaYa logo" className="app-logo" />
          <div>
            <h1>ConciliaYa</h1>
            <p>Reconciliación y control de gastos hormiga</p>
          </div>
        </div>
        <nav>
          <Link to="/">Inicio</Link>
          {!user && <Link to="/login">Login</Link>}
          {!user && <Link to="/register">Registro</Link>}
          {user && <Link to="/dashboard">Dashboard</Link>}
          {user && <Link to="/expenses">Gastos</Link>}
          {user && (
            <button type="button" className="secondary-button" onClick={logout}>
              Cerrar sesión
            </button>
          )}
        </nav>
      </header>

      <main className="app-content">
        <Outlet />
      </main>

      <footer className="app-footer">
        <small>Proyecto Integrador · ConciliaYa · HU05-HU10</small>
      </footer>
    </div>
  );
}
