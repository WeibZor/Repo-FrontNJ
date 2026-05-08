import db from '../database/localDatabase.js';
import PerfilModel from '../database/models/PerfilModel.js';

class PerfilRepository {
  async getAll() {
    await this.simulateDelay();
    return db.getCollection('perfiles');
  }

  async getById(id) {
    await this.simulateDelay();
    const perfiles = db.getCollection('perfiles');
    return perfiles.find(p => p.id === id) || null;
  }

  async create(data) {
    await this.simulateDelay();
    const validatedData = PerfilModel.validate(data);
    const normalizedData = PerfilModel.normalize(validatedData);
    return db.addToCollection('perfiles', normalizedData);
  }

  async update(id, data) {
    await this.simulateDelay();
    const validatedData = PerfilModel.validate(data);
    return db.updateInCollection('perfiles', id, validatedData);
  }

  async delete(id) {
    await this.simulateDelay();
    return db.removeFromCollection('perfiles', id);
  }

  async search(query) {
    await this.simulateDelay();
    const perfiles = db.getCollection('perfiles');
    const lowerQuery = query.toLowerCase();
    return perfiles.filter(p =>
      p.nombre.toLowerCase().includes(lowerQuery) ||
      p.descripcion.toLowerCase().includes(lowerQuery)
    );
  }

  async paginate(page = 1, limit = 10) {
    await this.simulateDelay();
    const perfiles = db.getCollection('perfiles');
    const start = (page - 1) * limit;
    const end = start + limit;
    return {
      data: perfiles.slice(start, end),
      total: perfiles.length,
      page,
      limit,
      totalPages: Math.ceil(perfiles.length / limit)
    };
  }

  async filter(filters) {
    await this.simulateDelay();
    let perfiles = db.getCollection('perfiles');

    if (filters.activo !== undefined) {
      perfiles = perfiles.filter(p => p.activo === filters.activo);
    }
    if (filters.search) {
      const lowerSearch = filters.search.toLowerCase();
      perfiles = perfiles.filter(p =>
        p.nombre.toLowerCase().includes(lowerSearch) ||
        p.descripcion.toLowerCase().includes(lowerSearch)
      );
    }

    return perfiles;
  }

  async simulateDelay() {
    return new Promise(resolve => setTimeout(resolve, Math.random() * 500 + 200));
  }
}

export default new PerfilRepository();