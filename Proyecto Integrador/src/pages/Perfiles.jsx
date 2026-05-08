import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { UserCheck, ShieldCheck, Search, CircleDot, ChevronRight, Users } from 'lucide-react';
import perfilRepository from '../repositories/perfilRepository.js';

const Perfiles = () => {
  const [perfiles, setPerfiles] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  const loadPerfiles = async (query = '') => {
    setLoading(true);
    const data = query ? await perfilRepository.search(query) : await perfilRepository.getAll();
    setPerfiles(data);
    setLoading(false);
  };

  useEffect(() => {
    loadPerfiles(searchQuery);
  }, [searchQuery]);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-green-500 to-teal-500 px-4 py-2 text-white shadow-xl shadow-green-500/20">
            <UserCheck className="h-5 w-5" />
            <span>Perfiles</span>
          </div>
          <h1 className="mt-3 text-3xl font-bold text-white">Estructura de roles</h1>
          <p className="max-w-2xl text-gray-400 mt-2">Define permisos, flujos y niveles de acceso para tu equipo operativo.</p>
        </div>

        <button className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white shadow-xl shadow-black/20 transition-all hover:bg-white/10">
          <ShieldCheck className="h-4 w-4" />
          Crear perfil
        </button>
      </div>

      <div className="glass rounded-3xl border border-white/10 p-6 shadow-2xl">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-white">Control de roles</h2>
            <p className="text-sm text-gray-400">Asegura una administración clara y un acceso alineado a las funciones de mediación.</p>
          </div>
          <div className="relative w-full max-w-md">
            <Search className="absolute left-4 top-3 h-5 w-5 text-gray-400" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar perfil por nombre"
              className="w-full rounded-2xl border border-white/10 bg-white/5 py-3 pl-12 pr-4 text-white placeholder-gray-400 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/30 transition-all"
            />
          </div>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.5fr_0.9fr]">
        <div className="glass rounded-3xl border border-white/10 p-6 shadow-2xl">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-gray-500">Perfiles definidos</p>
              <h3 className="mt-2 text-2xl font-semibold text-white">{perfiles.length} roles activos</h3>
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
          ) : perfiles.length === 0 ? (
            <div className="rounded-3xl bg-white/5 p-6 text-center text-sm text-gray-400">No hay perfiles definidos en la base de datos.</div>
          ) : (
            <div className="space-y-3">
              {perfiles.slice(0, 6).map((perfil) => (
                <div key={perfil.id} className="group flex flex-col gap-3 rounded-3xl border border-white/10 bg-white/5 p-4 transition-all hover:-translate-y-0.5 hover:bg-white/10">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm text-gray-400">#{perfil.id}</p>
                      <h4 className="mt-1 text-lg font-semibold text-white">{perfil.nombre}</h4>
                    </div>
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold text-white ${
                      perfil.activo ? 'bg-gradient-to-r from-emerald-500 to-green-500' : 'bg-gradient-to-r from-gray-500 to-gray-600'
                    }`}>
                      {perfil.activo ? 'Activo' : 'Inactivo'}
                    </span>
                  </div>
                  <p className="text-sm leading-6 text-gray-300 line-clamp-2">{perfil.descripcion}</p>
                  <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-gray-400">
                    <span>Fecha alta: {new Date(perfil.fechaAlta).toLocaleDateString()}</span>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      <span>Usuarios asignados</span>
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
            <h4 className="text-lg font-semibold text-white">Gestión de permisos</h4>
            <button className="rounded-2xl bg-white/5 px-3 py-2 text-sm font-semibold text-white transition-all hover:bg-white/10">Ver todo</button>
          </div>
          <div className="space-y-4">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-4 text-sm text-gray-300">
              <p className="font-semibold text-white">Roles y accesos</p>
              <p className="mt-2 text-sm text-gray-400">Los perfiles se cargan automáticamente desde la DB local.</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-4 text-sm text-gray-300">
              <p className="font-semibold text-white">Control granular</p>
              <p className="mt-2 text-sm text-gray-400">Define permisos específicos para cada rol de usuario.</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Perfiles;
