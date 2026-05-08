import usuarioRepository from '../repositories/usuarioRepository.js';

class UsuariosApi {
  async getAll(params = {}) {
    try {
      if (params.page) {
        return await usuarioRepository.paginate(params.page, params.limit || 10);
      }
      if (params.search) {
        return await usuarioRepository.search(params.search);
      }
      if (Object.keys(params).length > 0) {
        return await usuarioRepository.filter(params);
      }
      return await usuarioRepository.getAll();
    } catch (error) {
      throw { response: { status: 500, data: { message: 'Error interno del servidor' } } };
    }
  }

  async getById(id) {
    try {
      const user = await usuarioRepository.getById(parseInt(id));
      if (!user) {
        throw { response: { status: 404, data: { message: 'Usuario no encontrado' } } };
      }
      return user;
    } catch (error) {
      if (error.response) throw error;
      throw { response: { status: 500, data: { message: 'Error interno del servidor' } } };
    }
  }

  async create(data) {
    try {
      const user = await usuarioRepository.create(data);
      return { data: user, status: 201 };
    } catch (error) {
      if (error.response) throw error;
      throw { response: { status: 400, data: { message: 'Datos inválidos' } } };
    }
  }

  async update(id, data) {
    try {
      const user = await usuarioRepository.update(parseInt(id), data);
      if (!user) {
        throw { response: { status: 404, data: { message: 'Usuario no encontrado' } } };
      }
      return { data: user };
    } catch (error) {
      if (error.response) throw error;
      throw { response: { status: 400, data: { message: 'Datos inválidos' } } };
    }
  }

  async delete(id) {
    try {
      const result = await usuarioRepository.delete(parseInt(id));
      return { data: { message: 'Usuario eliminado' } };
    } catch (error) {
      throw { response: { status: 500, data: { message: 'Error interno del servidor' } } };
    }
  }
}

export default new UsuariosApi();