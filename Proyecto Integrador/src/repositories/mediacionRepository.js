import db from '../database/localDatabase.js';
import MediacionModel from '../database/models/MediacionModel.js';

class MediacionRepository {
  async getAll() {
    await this.simulateDelay();
    return db.getCollection('mediaciones');
  }

  async getById(id) {
    await this.simulateDelay();
    const mediaciones = db.getCollection('mediaciones');
    return mediaciones.find(m => m.id === id) || null;
  }

  async create(data) {
    await this.simulateDelay();
    const validatedData = MediacionModel.validate(data);
    const normalizedData = MediacionModel.normalize(validatedData);
    return db.addToCollection('mediaciones', normalizedData);
  }

  async update(id, data) {
    await this.simulateDelay();
    const validatedData = MediacionModel.validate(data);
    return db.updateInCollection('mediaciones', id, validatedData);
  }

  async delete(id) {
    await this.simulateDelay();
    return db.removeFromCollection('mediaciones', id);
  }

  async search(query) {
    await this.simulateDelay();
    const mediaciones = db.getCollection('mediaciones');
    const lowerQuery = query.toLowerCase();
    return mediaciones.filter(m =>
      m.observaciones?.toLowerCase().includes(lowerQuery) ||
      m.lugar.toLowerCase().includes(lowerQuery)
    );
  }

  async paginate(page = 1, limit = 10) {
    await this.simulateDelay();
    const mediaciones = db.getCollection('mediaciones');
    const start = (page - 1) * limit;
    const end = start + limit;
    return {
      data: mediaciones.slice(start, end),
      total: mediaciones.length,
      page,
      limit,
      totalPages: Math.ceil(mediaciones.length / limit)
    };
  }

  async filter(filters) {
    await this.simulateDelay();
    let mediaciones = db.getCollection('mediaciones');

    if (filters.conflictoId) {
      mediaciones = mediaciones.filter(m => m.conflictoId === filters.conflictoId);
    }
    if (filters.usuarioMediadorId) {
      mediaciones = mediaciones.filter(m => m.usuarioMediadorId === filters.usuarioMediadorId);
    }
    if (filters.activo !== undefined) {
      mediaciones = mediaciones.filter(m => m.activo === filters.activo);
    }

    return mediaciones;
  }

  async simulateDelay() {
    return new Promise(resolve => setTimeout(resolve, Math.random() * 500 + 200));
  }
}

export default new MediacionRepository();