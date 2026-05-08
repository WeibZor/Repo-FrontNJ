import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Search, ShieldCheck, CircleDot, ChevronRight, Hash } from 'lucide-react';
import estadoConflictoRepository from '../repositories/estadoConflictoRepository.js';

const EstadosConflicto = () => {
  const [estadosConflicto, setEstadosConflicto] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  const loadEstadosConflicto = async (query = '') => {
    setLoading(true);
    const data = query ? await estadoConflictoRepository.search(query) : await estadoConflictoRepository.getAll();
    setEstadosConflicto(data);
    setLoading(false);
  };

  useEffect(() => {
    loadEstadosConflicto(searchQuery);
  }, [searchQuery]);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-red-500 to-pink-500 px-4 py-2 text-white shadow-xl shadow-red-500/20">
            <FileText className="h-5 w-5" />
            <span>Estados de Conflicto</span>
          </div>
          <h1 className="mt-3 text-3xl font-bold text-white">Estados activos</h1>
          <p className="max-w-2xl text-gray-400 mt-2">Visualiza y administra estados de conflicto para cada proceso de conciliación.</p>
        </div>

        <button className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white shadow-xl shadow-black/20 transition-all hover:bg-white/10">
          <ShieldCheck className="h-4 w-4" />
          Nuevo estado
        </button>
      </div>

      <div className="glass rounded-3xl border border-white/10 p-6 shadow-2xl">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-white">Monitoreo de estado</h2>
            <p className="text-sm text-gray-400">Define indicadores claros para cada etapa del conflicto y sus resoluciones.</p>
          </div>
          <div className="relative w-full max-w-md">
            <Search className="absolute left-4 top-3 h-5 w-5 text-gray-400" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar estado de conflicto"
              className="w-full rounded-2xl border border-white/10 bg-white/5 py-3 pl-12 pr-4 text-white placeholder-gray-400 outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-400/30 transition-all"
            />
          </div>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.5fr_0.9fr]">
        <div className="glass rounded-3xl border border-white/10 p-6 shadow-2xl">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-gray-500">Estados definidos</p>
              <h3 className="mt-2 text-2xl font-semibold text-white">{estadosConflicto.length} estados activos</h3>
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
          ) : estadosConflicto.length === 0 ? (
            <div className="rounded-3xl bg-white/5 p-6 text-center text-sm text-gray-400">No hay estados de conflicto definidos en la base de datos.</div>
          ) : (
            <div className="space-y-3">
              {estadosConflicto.slice(0, 6).map((estado) => (
                <div key={estado.id} className="group flex flex-col gap-3 rounded-3xl border border-white/10 bg-white/5 p-4 transition-all hover:-translate-y-0.5 hover:bg-white/10">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm text-gray-400">#{estado.id}</p>
                      <h4 className="mt-1 text-lg font-semibold text-white">{estado.nombre}</h4>
                    </div>
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold text-white ${
                      estado.activo ? 'bg-gradient-to-r from-red-500 to-pink-500' : 'bg-gradient-to-r from-gray-500 to-gray-600'
                    }`}>
                      {estado.activo ? 'Activo' : 'Inactivo'}
                    </span>
                  </div>
                  <p className="text-sm leading-6 text-gray-300 line-clamp-2">{estado.descripcion}</p>
                  <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-gray-400">
                    <div className="flex items-center gap-2">
                      <Hash className="h-4 w-4" />
                      <span>{estado.codigo}</span>
                    </div>
                    <span>Conflictos en este estado</span>
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
            <h4 className="text-lg font-semibold text-white">Flujo de estados</h4>
            <button className="rounded-2xl bg-white/5 px-3 py-2 text-sm font-semibold text-white transition-all hover:bg-white/10">Ver todo</button>
          </div>
          <div className="space-y-4">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-4 text-sm text-gray-300">
              <p className="font-semibold text-white">Transiciones automáticas</p>
              <p className="mt-2 text-sm text-gray-400">Los estados se cargan automáticamente desde la DB local.</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-4 text-sm text-gray-300">
              <p className="font-semibold text-white">Workflow inteligente</p>
              <p className="mt-2 text-sm text-gray-400">Define el flujo de estados para cada tipo de conflicto.</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default EstadosConflicto;
