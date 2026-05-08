import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, Sparkles, ArrowRight } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

const loginSchema = z.object({
  email: z.string().email('Correo electrónico inválido'),
  password: z.string().min(1, 'Contraseña es requerida'),
});

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await login(data);
      toast.success('Inicio de sesión exitoso');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20"></div>

      {/* Floating orbs */}
      <motion.div
        animate={{
          x: [0, 30, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-20 left-20 w-32 h-32 bg-blue-500/20 rounded-full blur-xl"
      />
      <motion.div
        animate={{
          x: [0, -25, 0],
          y: [0, 15, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        className="absolute bottom-20 right-20 w-40 h-40 bg-purple-500/20 rounded-full blur-xl"
      />

      <Toaster position="top-right" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-md w-full space-y-8 relative z-10"
      >
        <motion.div
          variants={itemVariants}
          className="glass rounded-3xl shadow-2xl p-8 border border-white/10"
        >
          {/* Logo */}
          <motion.div
            variants={itemVariants}
            className="text-center mb-8"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg"
            >
              <Sparkles className="h-8 w-8 text-white" />
            </motion.div>
            <motion.h2
              variants={itemVariants}
              className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
            >
              ConciliaYa
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="mt-2 text-sm text-gray-400"
            >
              Sistema Inteligente de Mediación
            </motion.p>
          </motion.div>

          {/* Form */}
          <motion.form
            variants={itemVariants}
            className="space-y-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="space-y-4">
              {/* Email */}
              <motion.div variants={itemVariants}>
                <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                  Correo electrónico
                </label>
                <div className="relative">
                  <motion.input
                    whileFocus={{ scale: 1.02 }}
                    id="email"
                    type="email"
                    {...register('email')}
                    className="block w-full px-4 py-3 pl-12 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:bg-white/20"
                    placeholder="usuario@concilia.com"
                  />
                  <Mail className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                </div>
                {errors.email && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-1 text-sm text-red-400"
                  >
                    {errors.email.message}
                  </motion.p>
                )}
              </motion.div>

              {/* Password */}
              <motion.div variants={itemVariants}>
                <label htmlFor="password" className="block text-sm font-medium text-white mb-2">
                  Contraseña
                </label>
                <div className="relative">
                  <motion.input
                    whileFocus={{ scale: 1.02 }}
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    {...register('password')}
                    className="block w-full px-4 py-3 pl-12 pr-12 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:bg-white/20"
                    placeholder="••••••••"
                  />
                  <Lock className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-3.5 text-gray-400 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </motion.button>
                </div>
                {errors.password && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-1 text-sm text-red-400"
                  >
                    {errors.password.message}
                  </motion.p>
                )}
              </motion.div>
            </div>

            {/* Submit */}
            <motion.div variants={itemVariants}>
              <motion.button
                whileHover={{ scale: 1.02, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center items-center py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover-lift"
              >
                {loading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                  />
                ) : (
                  <>
                    Iniciar Sesión
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </motion.button>
            </motion.div>

            {/* Links */}
            <motion.div
              variants={itemVariants}
              className="text-center"
            >
              <Link
                to="/register"
                className="text-sm text-blue-400 hover:text-blue-300 transition-colors hover:underline"
              >
                ¿No tienes cuenta? Regístrate
              </Link>
            </motion.div>

            {/* Demo credentials */}
            <motion.div
              variants={itemVariants}
              className="bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-sm"
            >
              <p className="text-sm text-blue-300 font-medium mb-2 flex items-center">
                <Sparkles className="h-4 w-4 mr-2" />
                Credenciales de demo:
              </p>
              <div className="text-xs text-gray-300 space-y-1">
                <p><strong>Email:</strong> usuario1@concilia.com</p>
                <p><strong>Password:</strong> password123</p>
              </div>
            </motion.div>
          </motion.form>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;
