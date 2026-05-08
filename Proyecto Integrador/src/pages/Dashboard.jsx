import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  AlertTriangle,
  CheckCircle,
  MessageSquare,
  TrendingUp,
  Calendar,
  Activity,
  BarChart3,
  Sparkles,
  ArrowUpRight,
  Clock
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalConflictos: 0,
    conflictosAbiertos: 0,
    conflictosCerrados: 0,
    mediacionesActivas: 0,
    usuariosRegistrados: 0,
    tasaResolucion: 0
  });

  const [chartData, setChartData] = useState([]);
  const [pieData, setPieData] = useState([]);

  useEffect(() => {
    // Simular carga de datos
    const loadStats = () => {
      setStats({
        totalConflictos: 50,
        conflictosAbiertos: 25,
        conflictosCerrados: 20,
        mediacionesActivas: 15,
        usuariosRegistrados: 30,
        tasaResolucion: 75
      });

      setChartData([
        { name: 'Ene', conflictos: 4, mediaciones: 2 },
        { name: 'Feb', conflictos: 6, mediaciones: 3 },
        { name: 'Mar', conflictos: 8, mediaciones: 5 },
        { name: 'Abr', conflictos: 12, mediaciones: 7 },
        { name: 'May', conflictos: 15, mediaciones: 10 },
        { name: 'Jun', conflictos: 18, mediaciones: 12 }
      ]);

      setPieData([
        { name: 'Abiertos', value: 25, color: '#f59e0b' },
        { name: 'En Proceso', value: 15, color: '#3b82f6' },
        { name: 'Cerrados', value: 20, color: '#10b981' }
      ]);
    };

    loadStats();
  }, []);

  const StatCard = ({ title, value, icon: Icon, color, trend, delay = 0 }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ scale: 1.02, y: -5 }}
      className="glass rounded-2xl p-6 border border-white/10 hover-lift cursor-pointer"
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-400 mb-1">{title}</p>
          <p className="text-3xl font-bold text-white mb-2">{value}</p>
          {trend && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: delay + 0.3 }}
              className="flex items-center text-sm text-green-400"
            >
              <ArrowUpRight className="h-4 w-4 mr-1" />
              {trend}
            </motion.div>
          )}
        </div>
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          className={`p-4 rounded-2xl ${color} shadow-lg`}
        >
          <Icon className="h-6 w-6 text-white" />
        </motion.div>
      </div>
    </motion.div>
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Header */}
      <motion.div
        variants={itemVariants}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Dashboard Empresarial
          </h1>
          <p className="text-gray-400 mt-1">Sistema Inteligente de Mediación y Reconciliación</p>
        </div>
        <motion.div
          variants={itemVariants}
          className="flex items-center space-x-2 text-sm text-gray-400 bg-white/5 rounded-xl px-4 py-2 border border-white/10"
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <Activity className="h-4 w-4 text-green-400" />
          </motion.div>
          <span>Última actualización: hace 5 min</span>
        </motion.div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        variants={containerVariants}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <StatCard
          title="Total Conflictos"
          value={stats.totalConflictos}
          icon={AlertTriangle}
          color="bg-gradient-to-r from-red-500 to-pink-500"
          trend="+12% vs mes anterior"
          delay={0.1}
        />
        <StatCard
          title="Conflictos Abiertos"
          value={stats.conflictosAbiertos}
          icon={AlertTriangle}
          color="bg-gradient-to-r from-yellow-500 to-orange-500"
          delay={0.2}
        />
        <StatCard
          title="Conflictos Cerrados"
          value={stats.conflictosCerrados}
          icon={CheckCircle}
          color="bg-gradient-to-r from-green-500 to-emerald-500"
          trend="+8% vs mes anterior"
          delay={0.3}
        />
        <StatCard
          title="Mediaciones Activas"
          value={stats.mediacionesActivas}
          icon={MessageSquare}
          color="bg-gradient-to-r from-blue-500 to-cyan-500"
          delay={0.4}
        />
        <StatCard
          title="Usuarios Registrados"
          value={stats.usuariosRegistrados}
          icon={Users}
          color="bg-gradient-to-r from-purple-500 to-indigo-500"
          trend="+15% vs mes anterior"
          delay={0.5}
        />
        <StatCard
          title="Tasa de Resolución"
          value={`${stats.tasaResolucion}%`}
          icon={TrendingUp}
          color="bg-gradient-to-r from-indigo-500 to-purple-500"
          delay={0.6}
        />
      </motion.div>

      {/* Charts */}
      <motion.div
        variants={containerVariants}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        {/* Line Chart */}
        <motion.div
          variants={itemVariants}
          className="glass rounded-2xl p-6 border border-white/10"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-white">Evolución Mensual</h3>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="text-sm text-gray-400">Conflictos</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-gray-400">Mediaciones</span>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(17, 24, 39, 0.9)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  color: 'white'
                }}
              />
              <Line
                type="monotone"
                dataKey="conflictos"
                stroke="#f59e0b"
                strokeWidth={3}
                name="Conflictos"
                dot={{ fill: '#f59e0b', strokeWidth: 2, r: 6 }}
                activeDot={{ r: 8, stroke: '#f59e0b', strokeWidth: 2 }}
              />
              <Line
                type="monotone"
                dataKey="mediaciones"
                stroke="#3b82f6"
                strokeWidth={3}
                name="Mediaciones"
                dot={{ fill: '#3b82f6', strokeWidth: 2, r: 6 }}
                activeDot={{ r: 8, stroke: '#3b82f6', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Pie Chart */}
        <motion.div
          variants={itemVariants}
          className="glass rounded-2xl p-6 border border-white/10"
        >
          <h3 className="text-xl font-semibold text-white mb-6">Estado de Conflictos</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                stroke="rgba(255, 255, 255, 0.1)"
                strokeWidth={2}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(17, 24, 39, 0.9)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  color: 'white'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </motion.div>

      {/* Recent Activity */}
      <motion.div
        variants={itemVariants}
        className="glass rounded-2xl p-6 border border-white/10"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-white">Actividad Reciente</h3>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-blue-400 hover:text-blue-300 transition-colors text-sm flex items-center"
          >
            Ver todo
            <ArrowUpRight className="h-4 w-4 ml-1" />
          </motion.button>
        </div>
        <div className="space-y-4">
          {[
            {
              icon: AlertTriangle,
              color: 'text-green-400',
              bgColor: 'bg-green-500/20',
              title: 'Nuevo conflicto registrado - Caso #1234',
              time: '2 min ago'
            },
            {
              icon: MessageSquare,
              color: 'text-blue-400',
              bgColor: 'bg-blue-500/20',
              title: 'Mediación programada para mañana',
              time: '15 min ago'
            },
            {
              icon: Users,
              color: 'text-yellow-400',
              bgColor: 'bg-yellow-500/20',
              title: 'Usuario completó su perfil',
              time: '1 hour ago'
            }
          ].map((activity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center space-x-4 p-4 rounded-xl hover:bg-white/5 transition-colors cursor-pointer"
            >
              <div className={`p-2 rounded-xl ${activity.bgColor}`}>
                <activity.icon className={`h-5 w-5 ${activity.color}`} />
              </div>
              <div className="flex-1">
                <p className="text-white font-medium">{activity.title}</p>
                <div className="flex items-center text-sm text-gray-400 mt-1">
                  <Clock className="h-4 w-4 mr-1" />
                  {activity.time}
                </div>
              </div>
              <ArrowUpRight className="h-4 w-4 text-gray-400" />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;
