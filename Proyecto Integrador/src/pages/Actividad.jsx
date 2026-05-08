import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Clock, ListChecks } from 'lucide-react';

const Actividad = () => {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-lime-500 px-4 py-2 text-white shadow-lg">
            <Activity className="h-5 w-5" />
            <span>Actividad</span>
          </div>
          <h1 className="mt-3 text-3xl font-bold text-white">Registro de actividad</h1>
          <p className="max-w-2xl text-gray-400 mt-2">Revisa acciones clave, eventos y cambios de estado en tiempo real.</p>
        </div>

        <div className="inline-flex items-center gap-2 rounded-2xl bg-white/5 px-5 py-3 text-sm text-gray-300 shadow-xl">
          <Clock className="h-4 w-4 text-emerald-300" />
          Actividad 24h
        </div>
      </div>

      <div className="glass rounded-3xl border border-white/10 p-6 shadow-2xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-white">Flujo de acciones</h2>
            <p className="text-sm text-gray-400">Visualiza cambios recientes y mantiene el control operacional.</p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-2xl bg-white/5 px-4 py-3 text-sm text-gray-300">
            <ListChecks className="h-4 w-4 text-lime-300" />
            Auditoría en proceso
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Actividad;
