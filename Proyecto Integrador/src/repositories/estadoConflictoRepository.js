import db from '../database/localDatabase.js';

class EstadoConflictoRepository {
  async getAll() {
    await this.simulateDelay();
    return db.getCollection('estadosConflicto');
  }

  async getById(id) {
    await this.simulateDelay();
    const estados = db.getCollection('estadosConflicto');
    return estados.find(e => e.id === id) || null;
  }

  async create(data) {
    await this.simulateDelay();
    return db.addToCollection('estadosConflicto', data);
  }

  async update(id, data) {
    await this.simulateDelay();
    return db.updateInCollection('estadosConflicto', id, data);
  }

  async delete(id) {
    await this.simulateDelay();
    return db.removeFromCollection('estadosConflicto', id);
  }

  async search(query) {
    await this.simulateDelay();
    const estados = db.getCollection('estadosConflicto');
    const lowerQuery = query.toLowerCase();
    return estados.filter(e =>
      e.nombre.toLowerCase().includes(lowerQuery) ||
      e.descripcion.toLowerCase().includes(lowerQuery) ||
      e.codigo.toLowerCase().includes(lowerQuery)
    );
  }

  async filter(filters) {
    await this.simulateDelay();
    let estados = db.getCollection('estadosConflicto');

    if (filters.activo !== undefined) {
      estados = estados.filter(e => e.activo === filters.activo);
    }
    if (filters.search) {
      const lowerSearch = filters.search.toLowerCase();
      estados = estados.filter(e =>
        e.nombre.toLowerCase().includes(lowerSearch) ||
        e.descripcion.toLowerCase().includes(lowerSearch) ||
        e.codigo.toLowerCase().includes(lowerSearch)
      );
    }

    return estados;
  }

  async simulateDelay() {
    return new Promise(resolve => setTimeout(resolve, Math.random() * 500 + 200));
  }
}

export default new EstadoConflictoRepository();