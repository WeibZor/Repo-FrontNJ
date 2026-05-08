import React from 'react';
import { motion } from 'framer-motion';
import { Settings, ShieldCheck, Zap } from 'lucide-react';

const Configuracion = () => {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-slate-500 to-slate-700 px-4 py-2 text-white shadow-lg">
            <Settings className="h-5 w-5" />
            <span>Configuración</span>
          </div>
          <h1 className="mt-3 text-3xl font-bold text-white">Ajustes estratégicos</h1>
          <p className="max-w-2xl text-gray-400 mt-2">Define parámetros de seguridad, notificaciones y experiencia de usuario.</p>
        </div>

        <div className="inline-flex items-center gap-2 rounded-2xl bg-white/5 px-5 py-3 text-sm text-gray-300 shadow-xl">
          <Zap className="h-4 w-4 text-cyan-300" />
          Configuración avanzada
        </div>
      </div>

      <div className="glass rounded-3xl border border-white/10 p-6 shadow-2xl">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl bg-white/5 p-5">
            <h2 className="text-lg font-semibold text-white">Seguridad</h2>
            <p className="text-sm text-gray-400 mt-2">Controla accesos, autenticación y revisión de permisos.</p>
          </div>
          <div className="rounded-3xl bg-white/5 p-5">
            <h2 className="text-lg font-semibold text-white">Notificaciones</h2>
            <p className="text-sm text-gray-400 mt-2">Personaliza alertas y avisos internos para el equipo.</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Configuracion;
