import db from '../database/localDatabase.js';
import ConflictoModel from '../database/models/ConflictoModel.js';

class ConflictoRepository {
  async getAll() {
    await this.simulateDelay();
    return db.getCollection('conflictos');
  }

  async getById(id) {
    await this.simulateDelay();
    const conflictos = db.getCollection('conflictos');
    return conflictos.find(c => c.id === id) || null;
  }

  async create(data) {
    await this.simulateDelay();
    const validatedData = ConflictoModel.validate(data);
    const normalizedData = ConflictoModel.normalize(validatedData);
    return db.addToCollection('conflictos', normalizedData);
  }

  async update(id, data) {
    await this.simulateDelay();
    const validatedData = ConflictoModel.validate(data);
    return db.updateInCollection('conflictos', id, validatedData);
  }

  async delete(id) {
    await this.simulateDelay();
    return db.removeFromCollection('conflictos', id);
  }

  async search(query) {
    await this.simulateDelay();
    const conflictos = db.getCollection('conflictos');
    const lowerQuery = query.toLowerCase();
    return conflictos.filter(c =>
      c.asunto.toLowerCase().includes(lowerQuery) ||
      c.descripcion.toLowerCase().includes(lowerQuery)
    );
  }

  async paginate(page = 1, limit = 10) {
    await this.simulateDelay();
    const conflictos = db.getCollection('conflictos');
    const start = (page - 1) * limit;
    const end = start + limit;
    return {
      data: conflictos.slice(start, end),
      total: conflictos.length,
      page,
      limit,
      totalPages: Math.ceil(conflictos.length / limit)
    };
  }

  async filter(filters) {
    await this.simulateDelay();
    let conflictos = db.getCollection('conflictos');

    if (filters.tipoConflictoId) {
      conflictos = conflictos.filter(c => c.tipoConflictoId === filters.tipoConflictoId);
    }
    if (filters.estadoConflictoId) {
      conflictos = conflictos.filter(c => c.estadoConflictoId === filters.estadoConflictoId);
    }
    if (filters.activo !== undefined) {
      conflictos = conflictos.filter(c => c.activo === filters.activo);
    }
    if (filters.search) {
      const lowerSearch = filters.search.toLowerCase();
      conflictos = conflictos.filter(c =>
        c.asunto.toLowerCase().includes(lowerSearch) ||
        c.descripcion.toLowerCase().includes(lowerSearch)
      );
    }

    return conflictos;
  }

  async simulateDelay() {
    return new Promise(resolve => setTimeout(resolve, Math.random() * 500 + 200));
  }
}

export default new ConflictoRepository();