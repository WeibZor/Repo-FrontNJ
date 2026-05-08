import db from '../database/localDatabase.js';

class TipoConflictoRepository {
  async getAll() {
    await this.simulateDelay();
    return db.getCollection('tiposConflicto');
  }

  async getById(id) {
    await this.simulateDelay();
    const tipos = db.getCollection('tiposConflicto');
    return tipos.find(t => t.id === id) || null;
  }

  async create(data) {
    await this.simulateDelay();
    return db.addToCollection('tiposConflicto', data);
  }

  async update(id, data) {
    await this.simulateDelay();
    return db.updateInCollection('tiposConflicto', id, data);
  }

  async delete(id) {
    await this.simulateDelay();
    return db.removeFromCollection('tiposConflicto', id);
  }

  async search(query) {
    await this.simulateDelay();
    const tipos = db.getCollection('tiposConflicto');
    const lowerQuery = query.toLowerCase();
    return tipos.filter(t =>
      t.nombre.toLowerCase().includes(lowerQuery) ||
      t.descripcion.toLowerCase().includes(lowerQuery)
    );
  }

  async filter(filters) {
    await this.simulateDelay();
    let tipos = db.getCollection('tiposConflicto');

    if (filters.activo !== undefined) {
      tipos = tipos.filter(t => t.activo === filters.activo);
    }
    if (filters.search) {
      const lowerSearch = filters.search.toLowerCase();
      tipos = tipos.filter(t =>
        t.nombre.toLowerCase().includes(lowerSearch) ||
        t.descripcion.toLowerCase().includes(lowerSearch)
      );
    }

    return tipos;
  }

  async simulateDelay() {
    return new Promise(resolve => setTimeout(resolve, Math.random() * 500 + 200));
  }
}

export default new TipoConflictoRepository();