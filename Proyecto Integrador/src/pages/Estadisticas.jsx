import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, PieChart, Activity, Users, MessageSquare, DollarSign, Calendar } from 'lucide-react';
import conflictoRepository from '../repositories/conflictoRepository.js';
import mediacionRepository from '../repositories/mediacionRepository.js';
import usuarioRepository from '../repositories/usuarioRepository.js';
import publicacionesRepository from '../repositories/publicacionesRepository.js';

const Estadisticas = () => {
  const [stats, setStats] = useState({
    totalConflictos: 0,
    conflictosActivos: 0,
    mediacionesProgramadas: 0,
    mediacionesCompletadas: 0,
    totalUsuarios: 0,
    publicacionesRecientes: 0,
    montoTotal: 0,
    conflictosPorTipo: [],
    conflictosPorEstado: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    setLoading(true);
    try {
      const [conflictos, mediaciones, usuarios, publicaciones] = await Promise.all([
        conflictoRepository.getAll(),
        mediacionRepository.getAll(),
        usuarioRepository.getAll(),
        publicacionesRepository.getAll()
      ]);

      // Calcular estadísticas
      const conflictosActivos = conflictos.filter(c => c.activo).length;
      const mediacionesProgramadas = mediaciones.filter(m => !m.resultado).length;
      const mediacionesCompletadas = mediaciones.filter(m => m.resultado).length;
      const publicacionesRecientes = publicaciones.filter(p => {
        const fecha = new Date(p.fechaCreacion);
        const hace7Dias = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
        return fecha > hace7Dias;
      }).length;
      const montoTotal = conflictos.reduce((sum, c) => sum + (c.montoReclamado || 0), 0);

      // Conflictos por tipo
      const tiposCount = {};
      conflictos.forEach(c => {
        tiposCount[c.tipoConflictoId] = (tiposCount[c.tipoConflictoId] || 0) + 1;
      });
      const conflictosPorTipo = Object.entries(tiposCount).map(([tipoId, count]) => ({
        tipo: `Tipo ${tipoId}`,
        cantidad: count
      }));

      // Conflictos por estado
      const estadosCount = {};
      conflictos.forEach(c => {
        estadosCount[c.estadoConflictoId] = (estadosCount[c.estadoConflictoId] || 0) + 1;
      });
      const conflictosPorEstado = Object.entries(estadosCount).map(([estadoId, count]) => ({
        estado: `Estado ${estadoId}`,
        cantidad: count
      }));

      setStats({
        totalConflictos: conflictos.length,
        conflictosActivos,
        mediacionesProgramadas,
        mediacionesCompletadas,
        totalUsuarios: usuarios.length,
        publicacionesRecientes,
        montoTotal,
        conflictosPorTipo,
        conflictosPorEstado
      });
    } catch (error) {
      console.error('Error loading stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ icon: Icon, title, value, subtitle, color = 'cyan' }) => (
    <div className={`glass rounded-3xl border border-white/10 p-6 shadow-2xl bg-gradient-to-br from-${color}-500/10 to-${color}-600/5`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-400 uppercase tracking-wider">{title}</p>
          <p className="text-3xl font-bold text-white mt-1">{loading ? '...' : value}</p>
          {subtitle && <p className="text-sm text-gray-400 mt-1">{subtitle}</p>}
        </div>
        <div className={`p-3 rounded-2xl bg-${color}-500/20`}>
          <Icon className={`h-8 w-8 text-${color}-300`} />
        </div>
      </div>
    </div>
  );

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-sky-500 px-4 py-2 text-white shadow-xl shadow-cyan-500/20">
            <BarChart3 className="h-5 w-5" />
            <span>Estadísticas</span>
          </div>
          <h1 className="mt-3 text-3xl font-bold text-white">Análisis empresarial</h1>
          <p className="max-w-2xl text-gray-400 mt-2">Obtén métricas clave para la resolución y eficacia de mediaciones.</p>
        </div>

        <div className="inline-flex items-center gap-2 rounded-2xl bg-white/5 px-5 py-3 text-sm text-gray-300 shadow-xl">
          <TrendingUp className="h-4 w-4 text-green-300" />
          Dashboard avanzado
        </div>
      </div>

      <div className="glass rounded-3xl border border-white/10 p-6 shadow-2xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-white">Indicadores clave</h2>
            <p className="text-sm text-gray-400">Visualiza tendencias, tiempos de respuesta y resultados por equipo.</p>
          </div>
          <div className="inline-flex items-center rounded-2xl bg-white/5 px-4 py-3 text-sm text-gray-300">
            <Activity className="h-4 w-4 text-cyan-300 mr-2" />
            Informe de desempeño
          </div>
        </div>
      </div>

      {/* Cards de estadísticas */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={MessageSquare}
          title="Total Conflictos"
          value={stats.totalConflictos}
          subtitle={`${stats.conflictosActivos} activos`}
          color="cyan"
        />
        <StatCard
          icon={Calendar}
          title="Mediaciones"
          value={stats.mediacionesProgramadas + stats.mediacionesCompletadas}
          subtitle={`${stats.mediacionesCompletadas} completadas`}
          color="indigo"
        />
        <StatCard
          icon={Users}
          title="Usuarios"
          value={stats.totalUsuarios}
          subtitle="Registrados"
          color="emerald"
        />
        <StatCard
          icon={DollarSign}
          title="Monto Total"
          value={`$${stats.montoTotal.toLocaleString()}`}
          subtitle="Reclamado"
          color="amber"
        />
      </div>

      {/* Gráficas */}
      <div className="grid gap-4 xl:grid-cols-[1.5fr_0.9fr]">
        <div className="glass rounded-3xl border border-white/10 p-6 shadow-2xl">
          <div className="flex items-center justify-between gap-3 mb-6">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-gray-500">Distribución por tipo</p>
              <h3 className="mt-2 text-2xl font-semibold text-white">Conflictos por tipo</h3>
            </div>
            <div className="inline-flex items-center gap-2 rounded-2xl bg-white/5 px-3 py-2 text-sm text-gray-300">
              <PieChart className="h-4 w-4 text-cyan-400" />
              Tipos
            </div>
          </div>

          {loading ? (
            <div className="space-y-3">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="h-12 rounded-3xl bg-white/5 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {stats.conflictosPorTipo.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-3xl bg-white/5">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${
                      index === 0 ? 'bg-cyan-400' : index === 1 ? 'bg-indigo-400' : 'bg-emerald-400'
                    }`} />
                    <span className="text-white font-medium">{item.tipo}</span>
                  </div>
                  <span className="text-gray-400">{item.cantidad}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="glass rounded-3xl border border-white/10 p-6 shadow-2xl">
          <div className="flex items-center justify-between gap-3 mb-6">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-gray-500">Estado actual</p>
              <h3 className="mt-2 text-2xl font-semibold text-white">Conflictos por estado</h3>
            </div>
            <div className="inline-flex items-center gap-2 rounded-2xl bg-white/5 px-3 py-2 text-sm text-gray-300">
              <BarChart3 className="h-4 w-4 text-indigo-400" />
              Estados
            </div>
          </div>

          {loading ? (
            <div className="space-y-3">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="h-12 rounded-3xl bg-white/5 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {stats.conflictosPorEstado.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-3xl bg-white/5">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${
                      index === 0 ? 'bg-yellow-400' : index === 1 ? 'bg-blue-400' : 'bg-green-400'
                    }`} />
                    <span className="text-white font-medium">{item.estado}</span>
                  </div>
                  <span className="text-gray-400">{item.cantidad}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Actividad reciente */}
      <div className="glass rounded-3xl border border-white/10 p-6 shadow-2xl">
        <div className="flex items-center justify-between gap-3 mb-6">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-gray-500">Actividad reciente</p>
            <h3 className="mt-2 text-2xl font-semibold text-white">Publicaciones esta semana</h3>
          </div>
          <div className="inline-flex items-center gap-2 rounded-2xl bg-white/5 px-3 py-2 text-sm text-gray-300">
            <MessageSquare className="h-4 w-4 text-pink-400" />
            {stats.publicacionesRecientes} posts
          </div>
        </div>
        <p className="text-gray-400">
          Las estadísticas se calculan automáticamente desde la base de datos local y se actualizan en tiempo real.
        </p>
      </div>
    </motion.div>
  );
};

export default Estadisticas;
