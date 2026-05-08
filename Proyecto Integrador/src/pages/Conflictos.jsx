import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Search, BarChart3, ChevronRight, CircleDot } from 'lucide-react';
import conflictoRepository from '../repositories/conflictoRepository.js';

const Conflictos = () => {
  const [conflictos, setConflictos] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  const loadConflictos = async (query = '') => {
    setLoading(true);
    const data = query ? await conflictoRepository.search(query) : await conflictoRepository.getAll();
    setConflictos(data);
    setLoading(false);
  };

  useEffect(() => {
    loadConflictos(searchQuery);
  }, [searchQuery]);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-yellow-500 to-red-500 px-4 py-2 text-white shadow-xl shadow-yellow-500/20">
            <AlertTriangle className="h-5 w-5" />
            <span>Conflictos</span>
          </div>
          <h1 className="mt-3 text-3xl font-bold text-white">Control de conflictos</h1>
          <p className="max-w-2xl text-gray-400 mt-2">Visualiza los datos reales desde la DB local para identificación y seguimiento inmediato.</p>
        </div>

        <button className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white shadow-xl shadow-black/20 transition-all hover:bg-white/10">
          <BarChart3 className="h-4 w-4" />
          Nuevo conflicto
        </button>
      </div>

      <div className="glass rounded-3xl border border-white/10 p-6 shadow-2xl">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-white">Visión de casos</h2>
            <p className="text-sm text-gray-400">Supervisa y prioriza los conflictos críticos en tiempo real.</p>
          </div>
          <div className="relative w-full max-w-md">
            <Search className="absolute left-4 top-3 h-5 w-5 text-gray-400" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar conflicto por asunto o descripción"
              className="w-full rounded-2xl border border-white/10 bg-white/5 py-3 pl-12 pr-4 text-white placeholder-gray-400 outline-none focus:border-red-400 focus:ring-2 focus:ring-red-400/30 transition-all"
            />
          </div>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.5fr_0.9fr]">
        <div className="glass rounded-3xl border border-white/10 p-6 shadow-2xl">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-gray-500">Registros en la DB</p>
              <h3 className="mt-2 text-2xl font-semibold text-white">{conflictos.length} casos cargados</h3>
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
          ) : conflictos.length === 0 ? (
            <div className="rounded-3xl bg-white/5 p-6 text-center text-sm text-gray-400">No hay conflictos registrados en la base de datos.</div>
          ) : (
            <div className="space-y-3">
              {conflictos.slice(0, 6).map((conflicto) => (
                <div key={conflicto.id} className="group flex flex-col gap-3 rounded-3xl border border-white/10 bg-white/5 p-4 transition-all hover:-translate-y-0.5 hover:bg-white/10">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm text-gray-400">#{conflicto.id}</p>
                      <h4 className="mt-2 text-lg font-semibold text-white">{conflicto.asunto}</h4>
                    </div>
                    <span className="rounded-full bg-gradient-to-r from-red-500 to-pink-500 px-3 py-1 text-xs font-semibold text-white">Estado {conflicto.estadoConflictoId}</span>
                  </div>
                  <p className="text-sm leading-6 text-gray-300 line-clamp-2">{conflicto.descripcion}</p>
                  <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-gray-400">
                    <span>Tipo #{conflicto.tipoConflictoId}</span>
                    <span>Cliente: {conflicto.cliente || 'Anónimo'}</span>
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
            <h4 className="text-lg font-semibold text-white">Tendencia de conflictos</h4>
            <button className="rounded-2xl bg-white/5 px-3 py-2 text-sm font-semibold text-white transition-all hover:bg-white/10">Ver todo</button>
          </div>
          <div className="space-y-4">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-4 text-sm text-gray-300">
              <p className="font-semibold text-white">Conflictos recientes</p>
              <p className="mt-2 text-sm text-gray-400">Los últimos registros se cargan automáticamente desde la DB local.</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-4 text-sm text-gray-300">
              <p className="font-semibold text-white">Filtrado rápido</p>
              <p className="mt-2 text-sm text-gray-400">Busca por asunto y descripción para encontrar casos relevantes.</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Conflictos;
