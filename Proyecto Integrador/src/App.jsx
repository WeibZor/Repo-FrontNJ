import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import MainLayout from './layouts/MainLayout';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Usuarios from './pages/Usuarios';
import Perfiles from './pages/Perfiles';
import TiposConflicto from './pages/TiposConflicto';
import EstadosConflicto from './pages/EstadosConflicto';
import Conflictos from './pages/Conflictos';
import Mediaciones from './pages/Mediaciones';
import Feed from './pages/Feed';
import Estadisticas from './pages/Estadisticas';
import Actividad from './pages/Actividad';
import Configuracion from './pages/Configuracion';
import NotFound from './pages/NotFound';

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
        <Route path="register" element={!user ? <Register /> : <Navigate to="/dashboard" />} />

        <Route element={<PrivateRoute />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="usuarios" element={<Usuarios />} />
          <Route path="perfiles" element={<Perfiles />} />
          <Route path="tipos-conflicto" element={<TiposConflicto />} />
          <Route path="estados-conflicto" element={<EstadosConflicto />} />
          <Route path="conflictos" element={<Conflictos />} />
          <Route path="mediaciones" element={<Mediaciones />} />
          <Route path="feed" element={<Feed />} />
          <Route path="estadisticas" element={<Estadisticas />} />
          <Route path="actividad" element={<Actividad />} />
          <Route path="configuracion" element={<Configuracion />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
