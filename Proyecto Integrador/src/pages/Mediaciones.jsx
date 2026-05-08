import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Search, Calendar, CircleDot, ChevronRight, Clock, User, X, Plus } from 'lucide-react';
import mediacionRepository from '../repositories/mediacionRepository.js';
import conflictoRepository from '../repositories/conflictoRepository.js';
import { useAuth } from '../context/AuthContext';

const Mediaciones = () => {
  const [mediaciones, setMediaciones] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [conflictos, setConflictos] = useState([]);
  const [newMediacion, setNewMediacion] = useState({
    conflictoId: '',
    fechaMediacion: '',
    lugar: '',
    observaciones: ''
  });
  const [creating, setCreating] = useState(false);
  const { user } = useAuth();

  const loadMediaciones = async (query = '') => {
    setLoading(true);
    const data = query ? await mediacionRepository.search(query) : await mediacionRepository.getAll();
    setMediaciones(data);
    setLoading(false);
  };

  const loadConflictos = async () => {
    const data = await conflictoRepository.getAll();
    setConflictos(data.filter(c => c.activo));
  };

  useEffect(() => {
    loadMediaciones(searchQuery);
    loadConflictos();
  }, [searchQuery]);

  const handleCreateMediacion = async () => {
    if (!newMediacion.conflictoId || !newMediacion.fechaMediacion) return;

    setCreating(true);
    try {
      const mediacionData = {
        conflictoId: parseInt(newMediacion.conflictoId),
        mediadorId: user?.id || 1,
        estadoConflictoId: 2, // En proceso
        fechaMediacion: new Date(newMediacion.fechaMediacion).toISOString(),
        lugar: newMediacion.lugar || 'Oficina Central',
        observaciones: newMediacion.observaciones || 'Sesión programada',
        resultado: null,
        fechaRegistro: new Date().toISOString(),
        activo: true
      };

      await mediacionRepository.create(mediacionData);
      setNewMediacion({
        conflictoId: '',
        fechaMediacion: '',
        lugar: '',
        observaciones: ''
      });
      setShowCreateModal(false);
      loadMediaciones(); // Recargar mediaciones
    } catch (error) {
      console.error('Error creating mediacion:', error);
    } finally {
      setCreating(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-sky-500 px-4 py-2 text-white shadow-xl shadow-indigo-500/20">
            <MessageSquare className="h-5 w-5" />
            <span>Mediaciones</span>
          </div>
          <h1 className="mt-3 text-3xl font-bold text-white">Agenda de mediaciones</h1>
          <p className="max-w-2xl text-gray-400 mt-2">Coordina sesiones, registros y resultados desde un centro de control eficiente.</p>
        </div>

        <button 
          onClick={() => setShowCreateModal(true)}
          className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white shadow-xl shadow-black/20 transition-all hover:bg-white/10"
        >
          <Plus className="h-4 w-4" />
          Agendar mediación
        </button>
      </div>

      <div className="glass rounded-3xl border border-white/10 p-6 shadow-2xl">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-white">Seguimiento</h2>
            <p className="text-sm text-gray-400">Visualiza fechas, responsables y estado de cada mediación.</p>
          </div>
          <div className="relative w-full max-w-md">
            <Search className="absolute left-4 top-3 h-5 w-5 text-gray-400" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar mediación por caso o mediador"
              className="w-full rounded-2xl border border-white/10 bg-white/5 py-3 pl-12 pr-4 text-white placeholder-gray-400 outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-400/30 transition-all"
            />
          </div>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.5fr_0.9fr]">
        <div className="glass rounded-3xl border border-white/10 p-6 shadow-2xl">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-gray-500">Mediaciones programadas</p>
              <h3 className="mt-2 text-2xl font-semibold text-white">{mediaciones.length} sesiones activas</h3>
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
          ) : mediaciones.length === 0 ? (
            <div className="rounded-3xl bg-white/5 p-6 text-center text-sm text-gray-400">No hay mediaciones programadas en la base de datos.</div>
          ) : (
            <div className="space-y-3">
              {mediaciones.slice(0, 6).map((mediacion) => (
                <div key={mediacion.id} className="group flex flex-col gap-3 rounded-3xl border border-white/10 bg-white/5 p-4 transition-all hover:-translate-y-0.5 hover:bg-white/10">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm text-gray-400">#{mediacion.id}</p>
                      <h4 className="mt-1 text-lg font-semibold text-white">Mediación #{mediacion.conflictoId}</h4>
                    </div>
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold text-white ${
                      mediacion.estadoConflictoId === 1 ? 'bg-gradient-to-r from-yellow-500 to-orange-500' :
                      mediacion.estadoConflictoId === 2 ? 'bg-gradient-to-r from-blue-500 to-indigo-500' :
                      'bg-gradient-to-r from-green-500 to-emerald-500'
                    }`}>
                      Estado {mediacion.estadoConflictoId}
                    </span>
                  </div>
                  <p className="text-sm leading-6 text-gray-300 line-clamp-2">{mediacion.observaciones || 'Sin observaciones adicionales'}</p>
                  <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-gray-400">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>{new Date(mediacion.fechaMediacion).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span>Mediador #{mediacion.mediadorId}</span>
                    </div>
                    <div className="inline-flex items-center gap-1 text-emerald-300">
                      <span>Ver</span>
                      <ChevronRight className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="glass rounded-3xl border border-white/10 p-6 shadow-2xl">
          <div className="flex items-center justify-between gap-3 mb-4">
            <h4 className="text-lg font-semibold text-white">Calendario de sesiones</h4>
            <button className="rounded-2xl bg-white/5 px-3 py-2 text-sm font-semibold text-white transition-all hover:bg-white/10">Ver todo</button>
          </div>
          <div className="space-y-4">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-4 text-sm text-gray-300">
              <p className="font-semibold text-white">Sesiones programadas</p>
              <p className="mt-2 text-sm text-gray-400">Las mediaciones se cargan automáticamente desde la DB local.</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-4 text-sm text-gray-300">
              <p className="font-semibold text-white">Seguimiento en tiempo real</p>
              <p className="mt-2 text-sm text-gray-400">Monitorea el progreso de cada sesión de mediación.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal para agendar mediación */}
      <AnimatePresence>
        {showCreateModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowCreateModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass rounded-3xl border border-white/10 p-6 shadow-2xl max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Agendar mediación</h3>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="rounded-full p-1 hover:bg-white/10 transition-colors"
                >
                  <X className="h-5 w-5 text-gray-400" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Conflicto</label>
                  <select
                    value={newMediacion.conflictoId}
                    onChange={(e) => setNewMediacion({ ...newMediacion, conflictoId: e.target.value })}
                    className="w-full rounded-2xl border border-white/10 bg-white/5 p-3 text-white outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-400/30"
                  >
                    <option value="">Seleccionar conflicto</option>
                    {conflictos.map((conflicto) => (
                      <option key={conflicto.id} value={conflicto.id}>
                        #{conflicto.id} - {conflicto.asunto}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Fecha y hora</label>
                  <input
                    type="datetime-local"
                    value={newMediacion.fechaMediacion}
                    onChange={(e) => setNewMediacion({ ...newMediacion, fechaMediacion: e.target.value })}
                    className="w-full rounded-2xl border border-white/10 bg-white/5 p-3 text-white outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-400/30"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Lugar</label>
                  <input
                    type="text"
                    value={newMediacion.lugar}
                    onChange={(e) => setNewMediacion({ ...newMediacion, lugar: e.target.value })}
                    placeholder="Oficina Central - Sala A"
                    className="w-full rounded-2xl border border-white/10 bg-white/5 p-3 text-white placeholder-gray-400 outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-400/30"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Observaciones</label>
                  <textarea
                    value={newMediacion.observaciones}
                    onChange={(e) => setNewMediacion({ ...newMediacion, observaciones: e.target.value })}
                    placeholder="Notas adicionales..."
                    className="w-full rounded-2xl border border-white/10 bg-white/5 p-3 text-white placeholder-gray-400 outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-400/30 resize-none"
                    rows={3}
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setShowCreateModal(false)}
                    className="flex-1 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-white/10"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleCreateMediacion}
                    disabled={!newMediacion.conflictoId || !newMediacion.fechaMediacion || creating}
                    className="flex-1 rounded-2xl bg-gradient-to-r from-indigo-500 to-sky-500 px-4 py-2 text-sm font-semibold text-white shadow-xl transition-all hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {creating ? 'Agendando...' : 'Agendar'}
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

export default Mediaciones;
