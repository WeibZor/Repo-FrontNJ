import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  Search,
  Bell,
  MessageSquare,
  Sun,
  Moon,
  User,
  Settings,
  LogOut,
  Sparkles,
  ChevronDown
} from 'lucide-react';

const Navbar = ({ onMenuClick }) => {
  const { user, darkMode, toggleDarkMode, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const handleLogout = async () => {
    await logout();
  };

  const notifications = [
    { id: 1, title: 'Nuevo conflicto registrado', time: '2 min ago', type: 'info' },
    { id: 2, title: 'Mediación programada', time: '15 min ago', type: 'success' },
    { id: 3, title: 'Usuario completó perfil', time: '1 hour ago', type: 'warning' },
  ];

  const menuVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -10, scale: 0.95 }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="glass-dark sticky top-0 z-40 border-b border-white/10 shadow-[0_25px_80px_-45px_rgba(15,23,42,0.8)] backdrop-blur-xl"
    >
      <div className="flex flex-col gap-2 px-4 py-2 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onMenuClick}
              className="p-2 rounded-2xl text-white hover:bg-white/10 transition-all duration-300 lg:hidden hover-lift"
            >
              <Menu className="h-5 w-5" />
            </motion.button>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2"
            >
              <div className="w-10 h-10 gradient-primary rounded-2xl flex items-center justify-center shadow-xl">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
            </motion.div>
          </div>

          <div className="hidden md:flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-sm text-gray-300 shadow-lg border border-white/10">
            <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            Estado: Operativo
          </div>
        </div>

        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative w-full max-w-xl"
          >
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Buscar conflictos, usuarios, mediaciones..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-2xl border border-white/15 bg-white/10 py-3 pl-12 pr-4 text-white placeholder-gray-400 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300"
            />
          </motion.div>

          <div className="flex flex-wrap items-center gap-2 justify-end">
            <div className="flex items-center space-x-2">
              {/* Dark mode toggle */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 180 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleDarkMode}
                className="p-2 rounded-full bg-white/5 text-white hover:bg-white/15 transition-all duration-300 hover-lift"
              >
                {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </motion.button>

              {/* Messages */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-full bg-white/5 text-white hover:bg-white/15 transition-all duration-300 hover-lift relative"
              >
                <MessageSquare className="h-4 w-4" />
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="absolute -top-1 -right-1 block h-2.5 w-2.5 rounded-full bg-red-500 border-2 border-gray-900"
                />
              </motion.button>
              {/* Notifications */}
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-2 rounded-xl text-white hover:bg-white/10 transition-all duration-300 hover-lift relative"
                >
                  <Bell className="h-5 w-5" />
                  <motion.span
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute -top-1 -right-1 block h-3 w-3 rounded-full bg-red-500 border-2 border-gray-800"
                  />
                </motion.button>

                <AnimatePresence>
                  {showNotifications && (
                    <motion.div
                      variants={menuVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="absolute right-0 mt-2 w-80 glass-dark rounded-xl shadow-2xl border border-white/10 z-50"
                    >
                      <div className="p-4 border-b border-white/10">
                        <h3 className="text-lg font-semibold text-white">Notificaciones</h3>
                      </div>
                      <div className="max-h-96 overflow-y-auto">
                        {notifications.map((notification) => (
                          <motion.div
                            key={notification.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="p-4 border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer"
                          >
                            <div className="flex items-start space-x-3">
                              <div className={`w-2 h-2 rounded-full mt-2 ${
                                notification.type === 'info' ? 'bg-blue-500' :
                                notification.type === 'success' ? 'bg-green-500' : 'bg-yellow-500'
                              }`} />
                              <div className="flex-1">
                                <p className="text-sm text-white font-medium">{notification.title}</p>
                                <p className="text-xs text-gray-400">{notification.time}</p>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                      <div className="p-4">
                        <button className="w-full text-center text-sm text-blue-400 hover:text-blue-300 transition-colors">
                          Ver todas las notificaciones
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Profile dropdown */}
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center space-x-2 bg-white/10 rounded-xl p-2 hover:bg-white/20 transition-all duration-300 hover-lift"
                >
                  <img
                    src={user?.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=default'}
                    alt="Avatar"
                    className="h-8 w-8 rounded-full border-2 border-white/20"
                  />
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-medium text-white">
                      {user?.nombre}
                    </p>
                    <p className="text-xs text-gray-400">
                      {user?.perfilId === 1 ? 'Admin' : user?.perfilId === 2 ? 'Gestor' : 'Usuario'}
                    </p>
                  </div>
                  <ChevronDown className="h-4 w-4 text-gray-400" />
                </motion.button>

                <AnimatePresence>
                  {showProfileMenu && (
                    <motion.div
                      variants={menuVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="absolute right-0 mt-2 w-56 glass-dark rounded-xl shadow-2xl border border-white/10 z-50"
                    >
                      <div className="p-4 border-b border-white/10">
                        <div className="flex items-center space-x-3">
                          <img
                            src={user?.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=default'}
                            alt="Avatar"
                            className="h-10 w-10 rounded-full border-2 border-white/20"
                          />
                          <div>
                            <p className="text-sm font-medium text-white">
                              {user?.nombre} {user?.apellido}
                            </p>
                            <p className="text-xs text-gray-400">{user?.correo}</p>
                          </div>
                        </div>
                      </div>

                      <div className="py-2">
                        <a
                          href="#"
                          className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
                        >
                          <User className="mr-3 h-4 w-4" />
                          Mi Perfil
                        </a>

                        <a
                          href="#"
                          className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
                        >
                          <Settings className="mr-3 h-4 w-4" />
                          Configuración
                        </a>
                      </div>

                      <div className="border-t border-white/10 py-2">
                        <button
                          onClick={handleLogout}
                          className="flex items-center w-full px-4 py-2 text-sm text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-colors"
                        >
                          <LogOut className="mr-3 h-4 w-4" />
                          Cerrar Sesión
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Navbar;