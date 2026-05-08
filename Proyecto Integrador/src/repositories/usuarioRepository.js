import db from '../database/localDatabase.js';
import UsuarioModel from '../database/models/UsuarioModel.js';

class UsuarioRepository {
  async getAll() {
    await this.simulateDelay();
    return db.getCollection('usuarios');
  }

  async getById(id) {
    await this.simulateDelay();
    const usuarios = db.getCollection('usuarios');
    return usuarios.find(u => u.id === id) || null;
  }

  async create(data) {
    await this.simulateDelay();
    const validatedData = UsuarioModel.validate(data);
    const normalizedData = UsuarioModel.normalize(validatedData);
    return db.addToCollection('usuarios', normalizedData);
  }

  async update(id, data) {
    await this.simulateDelay();
    const validatedData = UsuarioModel.validate(data);
    return db.updateInCollection('usuarios', id, validatedData);
  }

  async delete(id) {
    await this.simulateDelay();
    return db.removeFromCollection('usuarios', id);
  }

  async search(query) {
    await this.simulateDelay();
    const usuarios = db.getCollection('usuarios');
    const lowerQuery = query.toLowerCase();
    return usuarios.filter(u =>
      u.nombre.toLowerCase().includes(lowerQuery) ||
      u.apellido.toLowerCase().includes(lowerQuery) ||
      u.correo.toLowerCase().includes(lowerQuery)
    );
  }

  async paginate(page = 1, limit = 10) {
    await this.simulateDelay();
    const usuarios = db.getCollection('usuarios');
    const start = (page - 1) * limit;
    const end = start + limit;
    return {
      data: usuarios.slice(start, end),
      total: usuarios.length,
      page,
      limit,
      totalPages: Math.ceil(usuarios.length / limit)
    };
  }

  async filter(filters) {
    await this.simulateDelay();
    let usuarios = db.getCollection('usuarios');

    if (filters.perfilId) {
      usuarios = usuarios.filter(u => u.perfilId === filters.perfilId);
    }
    if (filters.activo !== undefined) {
      usuarios = usuarios.filter(u => u.activo === filters.activo);
    }
    if (filters.search) {
      const lowerSearch = filters.search.toLowerCase();
      usuarios = usuarios.filter(u =>
        u.nombre.toLowerCase().includes(lowerSearch) ||
        u.apellido.toLowerCase().includes(lowerSearch)
      );
    }

    return usuarios;
  }

  async simulateDelay() {
    return new Promise(resolve => setTimeout(resolve, Math.random() * 500 + 200));
  }
}

export default new UsuarioRepository();