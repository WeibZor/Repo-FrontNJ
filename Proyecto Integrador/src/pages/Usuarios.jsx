import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Search, Plus, CircleDot, ChevronRight, Mail, Phone, X, Shield } from 'lucide-react';
import usuarioRepository from '../repositories/usuarioRepository.js';
import Pagination from '../components/Pagination.jsx';
import useRoleAccess from '../hooks/useRoleAccess.js';

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [creating, setCreating] = useState(false);
  const [newUser, setNewUser] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    telefono: '',
    documento: '',
    perfilId: 3,
    password: ''
  });
  const { permissions, isAdmin } = useRoleAccess();
  const ITEMS_PER_PAGE = 6;

  const loadUsuarios = async (query = '') => {
    setLoading(true);
    const data = query ? await usuarioRepository.search(query) : await usuarioRepository.getAll();
    setUsuarios(data);
    setCurrentPage(1);
    setLoading(false);
  };

  useEffect(() => {
    if (permissions.viewAllUsers) {
      loadUsuarios(searchQuery);
    }
  }, [searchQuery, permissions.viewAllUsers]);

  const handleCreateUser = async () => {
    if (!newUser.nombre || !newUser.apellido || !newUser.correo || !newUser.password) return;

    setCreating(true);
    try {
      await usuarioRepository.create({
        ...newUser,
        perfilId: parseInt(newUser.perfilId),
        activo: true,
        fechaAlta: new Date().toISOString(),
        usuarioAltaId: 1,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${newUser.correo}`,
        estadoOnline: false,
        actividad: new Date().toISOString()
      });
      setNewUser({ nombre: '', apellido: '', correo: '', telefono: '', documento: '', perfilId: 3, password: '' });
      setShowModal(false);
      loadUsuarios();
    } catch (error) {
      console.error('Error creating user:', error);
    } finally {
      setCreating(false);
    }
  };

  if (!permissions.viewAllUsers) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl border border-white/10 bg-gradient-to-br from-red-500/10 to-red-600/5 p-6 text-center"
      >
        <p className="text-red-400">No tienes permisos para ver esta sección.</p>
      </motion.div>
    );
  }

  const totalPages = Math.ceil(usuarios.length / ITEMS_PER_PAGE);
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedUsuarios = usuarios.slice(startIdx, startIdx + ITEMS_PER_PAGE);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 px-4 py-2 text-white shadow-xl shadow-blue-500/20">
            <Users className="h-5 w-5" />
            <span>Usuarios</span>
          </div>
          <h1 className="mt-3 text-3xl font-bold text-white">Gestión de usuarios</h1>
          <p className="max-w-2xl text-gray-400 mt-2">Controla los perfiles, roles y permisos desde una vista profesional y segura.</p>
        </div>

        <button 
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white shadow-xl shadow-black/20 transition-all hover:bg-white/10"
        >
          <Plus className="h-4 w-4" />
          Nuevo usuario
        </button>
      </div>

      <div className="glass rounded-3xl border border-white/10 p-6 shadow-2xl">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-white">Panel rápido</h2>
            <p className="text-sm text-gray-400">Busca, filtra y administra usuarios con operaciones optimizadas.</p>
          </div>
          <div className="relative w-full max-w-md">
            <Search className="absolute left-4 top-3 h-5 w-5 text-gray-400" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar usuario por nombre o correo"
              className="w-full rounded-2xl border border-white/10 bg-white/5 py-3 pl-12 pr-4 text-white placeholder-gray-400 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30 transition-all"
            />
          </div>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.5fr_0.9fr]">
        <div className="glass rounded-3xl border border-white/10 p-6 shadow-2xl">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-gray-500">Usuarios registrados</p>
              <h3 className="mt-2 text-2xl font-semibold text-white">{usuarios.length} usuarios activos</h3>
            </div>
            <div className="inline-flex items-center gap-2 rounded-2xl bg-white/5 px-3 py-2 text-sm text-gray-300">
              <CircleDot className="h-3.5 w-3.5 text-emerald-400" />
              Actualizado en vivo
            </div>
          </div>

          {loading ? (
            <div className="space-y-3">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="h-20 rounded-3xl bg-white/5 animate-pulse" />
              ))}
            </div>
          ) : usuarios.length === 0 ? (
            <div className="rounded-3xl bg-white/5 p-6 text-center text-sm text-gray-400">No hay usuarios registrados en la base de datos.</div>
          ) : (
            <>
              <div className="space-y-3">
                {paginatedUsuarios.map((usuario) => (
                  <div key={usuario.id} className="group flex flex-col gap-3 rounded-3xl border border-white/10 bg-white/5 p-4 transition-all hover:-translate-y-0.5 hover:bg-white/10">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={usuario.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=default'}
                          alt="Avatar"
                          className="w-12 h-12 rounded-full border-2 border-white/20"
                        />
                        <div>
                          <p className="text-sm text-gray-400">#{usuario.id}</p>
                          <h4 className="mt-1 text-lg font-semibold text-white">{usuario.nombre} {usuario.apellido}</h4>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Shield className={`h-4 w-4 ${
                          usuario.perfilId === 1 ? 'text-red-400' : 
                          usuario.perfilId === 2 ? 'text-yellow-400' : 
                          'text-blue-400'
                        }`} />
                        <span className={`rounded-full px-3 py-1 text-xs font-semibold text-white ${
                          usuario.perfilId === 1 ? 'bg-gradient-to-r from-red-500 to-red-600' :
                          usuario.perfilId === 2 ? 'bg-gradient-to-r from-yellow-500 to-orange-500' :
                          'bg-gradient-to-r from-purple-500 to-pink-500'
                        }`}>
                          {usuario.perfilId === 1 ? 'Admin' : usuario.perfilId === 2 ? 'Gestor' : 'Usuario'}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-gray-400">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        <span>{usuario.correo}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        <span>{usuario.telefono || 'Sin teléfono'}</span>
                      </div>
                      <div className="inline-flex items-center gap-1 text-emerald-300">
                        <span>Ver</span>
                        <ChevronRight className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                  itemsPerPage={ITEMS_PER_PAGE}
                  totalItems={usuarios.length}
                />
              )}
            </>
          )}
        </div>

        <div className="glass rounded-3xl border border-white/10 p-6 shadow-2xl">
          <div className="flex items-center justify-between gap-3 mb-4">
            <h4 className="text-lg font-semibold text-white">Roles disponibles</h4>
          </div>
          <div className="space-y-3">
            <div className="rounded-3xl border border-red-500/30 bg-red-500/10 p-3 text-sm">
              <p className="font-semibold text-red-300">Administrador</p>
              <p className="mt-1 text-xs text-gray-400">Acceso total, gestión completa</p>
            </div>
            <div className="rounded-3xl border border-yellow-500/30 bg-yellow-500/10 p-3 text-sm">
              <p className="font-semibold text-yellow-300">Gestor</p>
              <p className="mt-1 text-xs text-gray-400">Gestión de conflictos y mediaciones</p>
            </div>
            <div className="rounded-3xl border border-blue-500/30 bg-blue-500/10 p-3 text-sm">
              <p className="font-semibold text-blue-300">Usuario</p>
              <p className="mt-1 text-xs text-gray-400">Crear conflictos, consultar estado</p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal para crear usuario */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass rounded-3xl border border-white/10 p-6 shadow-2xl max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Crear nuevo usuario</h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="rounded-full p-1 hover:bg-white/10 transition-colors"
                >
                  <X className="h-5 w-5 text-gray-400" />
                </button>
              </div>

              <div className="space-y-3">
                <input
                  type="text"
                  value={newUser.nombre}
                  onChange={(e) => setNewUser({ ...newUser, nombre: e.target.value })}
                  placeholder="Nombre"
                  className="w-full rounded-2xl border border-white/10 bg-white/5 p-3 text-white placeholder-gray-400 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30"
                />

                <input
                  type="text"
                  value={newUser.apellido}
                  onChange={(e) => setNewUser({ ...newUser, apellido: e.target.value })}
                  placeholder="Apellido"
                  className="w-full rounded-2xl border border-white/10 bg-white/5 p-3 text-white placeholder-gray-400 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30"
                />

                <input
                  type="email"
                  value={newUser.correo}
                  onChange={(e) => setNewUser({ ...newUser, correo: e.target.value })}
                  placeholder="Correo"
                  className="w-full rounded-2xl border border-white/10 bg-white/5 p-3 text-white placeholder-gray-400 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30"
                />

                <input
                  type="password"
                  value={newUser.password}
                  onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                  placeholder="Contraseña"
                  className="w-full rounded-2xl border border-white/10 bg-white/5 p-3 text-white placeholder-gray-400 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30"
                />

                <input
                  type="tel"
                  value={newUser.telefono}
                  onChange={(e) => setNewUser({ ...newUser, telefono: e.target.value })}
                  placeholder="Teléfono"
                  className="w-full rounded-2xl border border-white/10 bg-white/5 p-3 text-white placeholder-gray-400 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30"
                />

                <input
                  type="text"
                  value={newUser.documento}
                  onChange={(e) => setNewUser({ ...newUser, documento: e.target.value })}
                  placeholder="Documento"
                  className="w-full rounded-2xl border border-white/10 bg-white/5 p-3 text-white placeholder-gray-400 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30"
                />

                <select
                  value={newUser.perfilId}
                  onChange={(e) => setNewUser({ ...newUser, perfilId: e.target.value })}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 p-3 text-white outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30"
                >
                  <option value="3">Usuario</option>
                  <option value="2">Gestor</option>
                  <option value="1">Administrador</option>
                </select>

                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => setShowModal(false)}
                    className="flex-1 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-white/10"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleCreateUser}
                    disabled={!newUser.nombre || !newUser.apellido || !newUser.correo || !newUser.password || creating}
                    className="flex-1 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 px-4 py-2 text-sm font-semibold text-white shadow-xl transition-all hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {creating ? 'Creando...' : 'Crear'}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Usuarios;
