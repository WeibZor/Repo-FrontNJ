import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Heart, TrendingUp, CircleDot, User, Clock, X, Plus } from 'lucide-react';
import publicacionesRepository from '../repositories/publicacionesRepository.js';
import { useAuth } from '../context/AuthContext';

const Feed = () => {
  const [publicaciones, setPublicaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newPost, setNewPost] = useState({ contenido: '', imagen: '' });
  const [creating, setCreating] = useState(false);
  const { user } = useAuth();

  const loadPublicaciones = async () => {
    setLoading(true);
    const data = await publicacionesRepository.getRecent(10);
    setPublicaciones(data);
    setLoading(false);
  };

  useEffect(() => {
    loadPublicaciones();
  }, []);

  const handleCreatePost = async () => {
    if (!newPost.contenido.trim()) return;

    setCreating(true);
    try {
      const postData = {
        usuarioId: user?.id || 1,
        contenido: newPost.contenido,
        imagen: newPost.imagen || null,
        fechaCreacion: new Date().toISOString(),
        likes: 0,
        comentarios: 0
      };

      await publicacionesRepository.create(postData);
      setNewPost({ contenido: '', imagen: '' });
      setShowCreateModal(false);
      loadPublicaciones(); // Recargar publicaciones
    } catch (error) {
      console.error('Error creating post:', error);
    } finally {
      setCreating(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-pink-500 to-fuchsia-500 px-4 py-2 text-white shadow-xl shadow-pink-500/20">
            <MessageSquare className="h-5 w-5" />
            <span>Feed Social</span>
          </div>
          <h1 className="mt-3 text-3xl font-bold text-white">Comunidad empresarial</h1>
          <p className="max-w-2xl text-gray-400 mt-2">Comparte actualizaciones, resúmenes de mediación y noticias internas.</p>
        </div>

        <button 
          onClick={() => setShowCreateModal(true)}
          className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white shadow-xl shadow-black/20 transition-all hover:bg-white/10"
        >
          <Plus className="h-4 w-4" />
          Nueva publicación
        </button>
      </div>

      <div className="glass rounded-3xl border border-white/10 p-6 shadow-2xl">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-white">Interactúa con tu equipo</h2>
            <p className="text-sm text-gray-400">Publica avances, recibe comentarios y crea transparencia en procesos.</p>
          </div>
          <div className="inline-flex items-center rounded-2xl bg-white/5 px-4 py-3 text-sm text-gray-300">
            <Heart className="h-4 w-4 text-pink-400 mr-2" />
            Actividad reciente activa
          </div>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.5fr_0.9fr]">
        <div className="glass rounded-3xl border border-white/10 p-6 shadow-2xl">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-gray-500">Publicaciones recientes</p>
              <h3 className="mt-2 text-2xl font-semibold text-white">{publicaciones.length} posts activos</h3>
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
          ) : publicaciones.length === 0 ? (
            <div className="rounded-3xl bg-white/5 p-6 text-center text-sm text-gray-400">No hay publicaciones en el feed.</div>
          ) : (
            <div className="space-y-3">
              {publicaciones.map((publicacion) => (
                <div key={publicacion.id} className="group flex flex-col gap-3 rounded-3xl border border-white/10 bg-white/5 p-4 transition-all hover:-translate-y-0.5 hover:bg-white/10">
                  <div className="flex items-start gap-3">
                    <img
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=user${publicacion.usuarioId}`}
                      alt="Avatar"
                      className="w-10 h-10 rounded-full border-2 border-white/20"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-semibold text-white">Usuario #{publicacion.usuarioId}</span>
                        <span className="text-xs text-gray-400">•</span>
                        <div className="flex items-center gap-1 text-xs text-gray-400">
                          <Clock className="h-3 w-3" />
                          <span>{new Date(publicacion.fechaCreacion).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <p className="text-sm leading-6 text-gray-300">{publicacion.contenido}</p>
                      <div className="flex items-center gap-4 mt-3 text-xs text-gray-400">
                        <div className="flex items-center gap-1">
                          <Heart className="h-4 w-4" />
                          <span>{publicacion.likes || 0} likes</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageSquare className="h-4 w-4" />
                          <span>Comentarios</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="glass rounded-3xl border border-white/10 p-6 shadow-2xl">
          <div className="flex items-center justify-between gap-3 mb-4">
            <h4 className="text-lg font-semibold text-white">Tendencias del equipo</h4>
            <button className="rounded-2xl bg-white/5 px-3 py-2 text-sm font-semibold text-white transition-all hover:bg-white/10">Ver todo</button>
          </div>
          <div className="space-y-4">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-4 text-sm text-gray-300">
              <p className="font-semibold text-white">Publicaciones activas</p>
              <p className="mt-2 text-sm text-gray-400">El feed se carga automáticamente desde la DB local.</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-4 text-sm text-gray-300">
              <p className="font-semibold text-white">Interacción en tiempo real</p>
              <p className="mt-2 text-sm text-gray-400">Comparte actualizaciones y recibe feedback inmediato.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal para crear publicación */}
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
                <h3 className="text-lg font-semibold text-white">Nueva publicación</h3>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="rounded-full p-1 hover:bg-white/10 transition-colors"
                >
                  <X className="h-5 w-5 text-gray-400" />
                </button>
              </div>

              <div className="space-y-4">
                <textarea
                  value={newPost.contenido}
                  onChange={(e) => setNewPost({ ...newPost, contenido: e.target.value })}
                  placeholder="¿Qué quieres compartir?"
                  className="w-full rounded-2xl border border-white/10 bg-white/5 p-3 text-white placeholder-gray-400 outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-400/30 resize-none"
                  rows={4}
                />

                <input
                  type="url"
                  value={newPost.imagen}
                  onChange={(e) => setNewPost({ ...newPost, imagen: e.target.value })}
                  placeholder="URL de imagen (opcional)"
                  className="w-full rounded-2xl border border-white/10 bg-white/5 p-3 text-white placeholder-gray-400 outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-400/30"
                />

                <div className="flex gap-3">
                  <button
                    onClick={() => setShowCreateModal(false)}
                    className="flex-1 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-white/10"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleCreatePost}
                    disabled={!newPost.contenido.trim() || creating}
                    className="flex-1 rounded-2xl bg-gradient-to-r from-pink-500 to-fuchsia-500 px-4 py-2 text-sm font-semibold text-white shadow-xl transition-all hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {creating ? 'Publicando...' : 'Publicar'}
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

export default Feed;
