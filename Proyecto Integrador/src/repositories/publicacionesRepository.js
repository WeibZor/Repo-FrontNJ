import db from '../database/localDatabase.js';

class PublicacionesRepository {
  async getAll() {
    await this.simulateDelay();
    return db.getCollection('publicaciones');
  }

  async getById(id) {
    await this.simulateDelay();
    const publicaciones = db.getCollection('publicaciones');
    return publicaciones.find(p => p.id === id) || null;
  }

  async create(data) {
    await this.simulateDelay();
    return db.addToCollection('publicaciones', data);
  }

  async update(id, data) {
    await this.simulateDelay();
    return db.updateInCollection('publicaciones', id, data);
  }

  async delete(id) {
    await this.simulateDelay();
    return db.removeFromCollection('publicaciones', id);
  }

  async search(query) {
    await this.simulateDelay();
    const publicaciones = db.getCollection('publicaciones');
    const lowerQuery = query.toLowerCase();
    return publicaciones.filter(p =>
      p.contenido.toLowerCase().includes(lowerQuery)
    );
  }

  async getByUsuarioId(usuarioId) {
    await this.simulateDelay();
    const publicaciones = db.getCollection('publicaciones');
    return publicaciones.filter(p => p.usuarioId === usuarioId);
  }

  async getRecent(limit = 10) {
    await this.simulateDelay();
    const publicaciones = db.getCollection('publicaciones');
    return publicaciones
      .sort((a, b) => new Date(b.fechaCreacion) - new Date(a.fechaCreacion))
      .slice(0, limit);
  }

  async simulateDelay() {
    return new Promise(resolve => setTimeout(resolve, Math.random() * 500 + 200));
  }
}

export default new PublicacionesRepository();