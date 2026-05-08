import conflictoRepository from '../repositories/conflictoRepository.js';

class ConflictosApi {
  async getAll(params = {}) {
    try {
      if (params.page) {
        return await conflictoRepository.paginate(params.page, params.limit || 10);
      }
      if (params.search) {
        return await conflictoRepository.search(params.search);
      }
      if (Object.keys(params).length > 0) {
        return await conflictoRepository.filter(params);
      }
      return await conflictoRepository.getAll();
    } catch (error) {
      throw { response: { status: 500, data: { message: 'Error interno del servidor' } } };
    }
  }

  async getById(id) {
    try {
      const conflicto = await conflictoRepository.getById(parseInt(id));
      if (!conflicto) {
        throw { response: { status: 404, data: { message: 'Conflicto no encontrado' } } };
      }
      return conflicto;
    } catch (error) {
      if (error.response) throw error;
      throw { response: { status: 500, data: { message: 'Error interno del servidor' } } };
    }
  }

  async create(data) {
    try {
      const conflicto = await conflictoRepository.create(data);
      return { data: conflicto, status: 201 };
    } catch (error) {
      if (error.response) throw error;
      throw { response: { status: 400, data: { message: 'Datos inválidos' } } };
    }
  }

  async update(id, data) {
    try {
      const conflicto = await conflictoRepository.update(parseInt(id), data);
      if (!conflicto) {
        throw { response: { status: 404, data: { message: 'Conflicto no encontrado' } } };
      }
      return { data: conflicto };
    } catch (error) {
      if (error.response) throw error;
      throw { response: { status: 400, data: { message: 'Datos inválidos' } } };
    }
  }

  async delete(id) {
    try {
      const result = await conflictoRepository.delete(parseInt(id));
      return { data: { message: 'Conflicto eliminado' } };
    } catch (error) {
      throw { response: { status: 500, data: { message: 'Error interno del servidor' } } };
    }
  }
}

export default new ConflictosApi();