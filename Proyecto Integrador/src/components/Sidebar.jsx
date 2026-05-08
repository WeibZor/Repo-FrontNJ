import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Users,
  UserCheck,
  FileText,
  AlertTriangle,
  MessageSquare,
  BarChart3,
  Activity,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Sparkles
} from 'lucide-react';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const menuItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard', color: 'text-blue-500' },
    { path: '/usuarios', icon: Users, label: 'Usuarios', color: 'text-purple-500' },
    { path: '/perfiles', icon: UserCheck, label: 'Perfiles', color: 'text-green-500' },
    { path: '/tipos-conflicto', icon: AlertTriangle, label: 'Tipos de Conflicto', color: 'text-orange-500' },
    { path: '/estados-conflicto', icon: FileText, label: 'Estados de Conflicto', color: 'text-red-500' },
    { path: '/conflictos', icon: AlertTriangle, label: 'Conflictos', color: 'text-yellow-500' },
    { path: '/mediaciones', icon: MessageSquare, label: 'Mediaciones', color: 'text-indigo-500' },
    { path: '/feed', icon: MessageSquare, label: 'Feed Social', color: 'text-pink-500' },
    { path: '/estadisticas', icon: BarChart3, label: 'Estadísticas', color: 'text-cyan-500' },
    { path: '/actividad', icon: Activity, label: 'Actividad', color: 'text-emerald-500' },
    { path: '/configuracion', icon: Settings, label: 'Configuración', color: 'text-gray-500' },
  ];

  const handleLogout = async () => {
    await logout();
  };

  const sidebarVariants = {
    open: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    closed: {
      x: "-100%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.div
        initial={{ x: 0 }}
        className="hidden lg:flex lg:flex-shrink-0"
      >
        <div className="flex flex-col w-64 h-screen glass-dark border-r border-white/10">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex items-center justify-center h-16 px-4 border-b border-white/10"
          >
            <div className="w-10 h-10 gradient-primary rounded-2xl flex items-center justify-center shadow-lg">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
          </motion.div>

          {/* User Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center px-4 py-4 border-b border-white/10 mx-2"
          >
            <div className="relative">
              <img
                src={user?.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=default'}
                alt="Avatar"
                className="w-12 h-12 rounded-full border-2 border-white/20 hover-lift"
              />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-800 animate-pulse-slow"></div>
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-semibold text-white">
                {user?.nombre} {user?.apellido}
              </p>
              <p className="text-xs text-gray-400">
                {user?.perfilId === 1 ? 'Administrador' : user?.perfilId === 2 ? 'Gestor' : 'Usuario'}
              </p>
            </div>
          </motion.div>

          {/* Navigation */}
          <nav className="flex-1 px-2 py-4 space-y-2 overflow-y-auto">
            <AnimatePresence>
              {menuItems.map((item, index) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <motion.div
                    key={item.path}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: index * 0.04 }}
                  >
                    <Link
                      to={item.path}
                      className={`group flex items-center px-3 py-2 text-sm font-semibold rounded-2xl transition-all duration-300 hover-lift ${
                        isActive
                          ? 'bg-white/10 text-white shadow-[0_16px_60px_-48px_rgba(255,255,255,0.8)] border border-white/15'
                          : 'text-gray-300 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <span className={`flex h-10 w-10 items-center justify-center rounded-2xl ${isActive ? 'bg-white/10' : 'bg-white/5'} transition-colors`}>
                        <Icon className={`h-5 w-5 transition-colors ${isActive ? 'text-white' : item.color}`} />
                      </span>
                      <span className="ml-3 truncate">{item.label}</span>
                      {isActive && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="ml-auto w-2 h-2 bg-blue-500 rounded-full"
                        />
                      )}
                    </Link>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </nav>

          {/* Logout */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="p-4 border-t border-white/10 mx-2"
          >
            <button
              onClick={handleLogout}
              className="group flex items-center w-full px-3 py-3 text-sm font-medium text-gray-300 rounded-xl transition-all duration-300 hover:bg-red-500/20 hover:text-red-400 hover-lift"
            >
              <LogOut className="mr-3 h-5 w-5" />
              <span>Cerrar Sesión</span>
            </button>
          </motion.div>
        </div>
      </motion.div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 lg:hidden"
          >
            <motion.div
              variants={sidebarVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed inset-y-0 left-0 w-64 glass-dark border-r border-white/10"
            >
              {/* Close button */}
              <div className="flex items-center justify-between h-16 px-4 border-b border-white/10">
                <div className="w-10 h-10 gradient-primary rounded-2xl flex items-center justify-center shadow-lg">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-gray-300 transition-colors p-2 rounded-full hover:bg-white/10"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              </div>

              {/* User Info */}
              <div className="flex items-center px-4 py-4 border-b border-white/10 mx-2">
                <div className="relative">
                  <img
                    src={user?.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=default'}
                    alt="Avatar"
                    className="w-12 h-12 rounded-full border-2 border-white/20"
                  />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-800 animate-pulse-slow"></div>
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-sm font-semibold text-white">
                    {user?.nombre} {user?.apellido}
                  </p>
                  <p className="text-xs text-gray-400">
                    {user?.perfilId === 1 ? 'Administrador' : user?.perfilId === 2 ? 'Gestor' : 'Usuario'}
                  </p>
                </div>
              </div>

              {/* Navigation */}
              <nav className="flex-1 px-2 py-4 space-y-2 overflow-y-auto">
                {menuItems.map((item, index) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;
                  return (
                    <motion.div
                      key={item.path}
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setIsOpen(false)}
                        className={`group flex items-center px-3 py-2 text-sm font-semibold rounded-2xl transition-all duration-300 hover-lift ${
                          isActive
                            ? 'bg-white/10 text-white shadow-[0_14px_45px_-32px_rgba(255,255,255,0.8)] border border-white/15'
                            : 'text-gray-300 hover:bg-white/5 hover:text-white'
                        }`}
                      >
                        <span className={`flex h-10 w-10 items-center justify-center rounded-2xl ${isActive ? 'bg-white/10' : 'bg-white/5'} transition-colors`}>
                          <Icon className={`h-5 w-5 transition-colors ${isActive ? 'text-white' : item.color}`} />
                        </span>
                        <span className="ml-3 truncate">{item.label}</span>
                        {isActive && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="ml-auto w-2 h-2 bg-blue-500 rounded-full"
                          />
                        )}
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              {/* Logout */}
              <div className="p-4 border-t border-white/10 mx-2">
                <button
                  onClick={handleLogout}
                  className="group flex items-center w-full px-3 py-3 text-sm font-medium text-gray-300 rounded-xl transition-all duration-300 hover:bg-red-500/20 hover:text-red-400"
                >
                  <LogOut className="mr-3 h-5 w-5" />
                  <span>Cerrar Sesión</span>
                </button>
              </div>
            </motion.div>

            {/* Mobile overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;