import perfilRepository from '../repositories/perfilRepository.js';

class PerfilesApi {
  async getAll(params = {}) {
    try {
      if (params.page) {
        return await perfilRepository.paginate(params.page, params.limit || 10);
      }
      if (params.search) {
        return await perfilRepository.search(params.search);
      }
      if (Object.keys(params).length > 0) {
        return await perfilRepository.filter(params);
      }
      return await perfilRepository.getAll();
    } catch (error) {
      throw { response: { status: 500, data: { message: 'Error interno del servidor' } } };
    }
  }

  async getById(id) {
    try {
      const perfil = await perfilRepository.getById(parseInt(id));
      if (!perfil) {
        throw { response: { status: 404, data: { message: 'Perfil no encontrado' } } };
      }
      return perfil;
    } catch (error) {
      if (error.response) throw error;
      throw { response: { status: 500, data: { message: 'Error interno del servidor' } } };
    }
  }

  async create(data) {
    try {
      const perfil = await perfilRepository.create(data);
      return { data: perfil, status: 201 };
    } catch (error) {
      if (error.response) throw error;
      throw { response: { status: 400, data: { message: 'Datos inválidos' } } };
    }
  }

  async update(id, data) {
    try {
      const perfil = await perfilRepository.update(parseInt(id), data);
      if (!perfil) {
        throw { response: { status: 404, data: { message: 'Perfil no encontrado' } } };
      }
      return { data: perfil };
    } catch (error) {
      if (error.response) throw error;
      throw { response: { status: 400, data: { message: 'Datos inválidos' } } };
    }
  }

  async delete(id) {
    try {
      const result = await perfilRepository.delete(parseInt(id));
      return { data: { message: 'Perfil eliminado' } };
    } catch (error) {
      throw { response: { status: 500, data: { message: 'Error interno del servidor' } } };
    }
  }
}

export default new PerfilesApi();