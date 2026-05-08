import mediacionRepository from '../repositories/mediacionRepository.js';

class MediacionesApi {
  async getAll(params = {}) {
    try {
      if (params.page) {
        return await mediacionRepository.paginate(params.page, params.limit || 10);
      }
      if (params.search) {
        return await mediacionRepository.search(params.search);
      }
      if (Object.keys(params).length > 0) {
        return await mediacionRepository.filter(params);
      }
      return await mediacionRepository.getAll();
    } catch (error) {
      throw { response: { status: 500, data: { message: 'Error interno del servidor' } } };
    }
  }

  async getById(id) {
    try {
      const mediacion = await mediacionRepository.getById(parseInt(id));
      if (!mediacion) {
        throw { response: { status: 404, data: { message: 'Mediación no encontrada' } } };
      }
      return mediacion;
    } catch (error) {
      if (error.response) throw error;
      throw { response: { status: 500, data: { message: 'Error interno del servidor' } } };
    }
  }

  async create(data) {
    try {
      const mediacion = await mediacionRepository.create(data);
      return { data: mediacion, status: 201 };
    } catch (error) {
      if (error.response) throw error;
      throw { response: { status: 400, data: { message: 'Datos inválidos' } } };
    }
  }

  async update(id, data) {
    try {
      const mediacion = await mediacionRepository.update(parseInt(id), data);
      if (!mediacion) {
        throw { response: { status: 404, data: { message: 'Mediación no encontrada' } } };
      }
      return { data: mediacion };
    } catch (error) {
      if (error.response) throw error;
      throw { response: { status: 400, data: { message: 'Datos inválidos' } } };
    }
  }

  async delete(id) {
    try {
      const result = await mediacionRepository.delete(parseInt(id));
      return { data: { message: 'Mediación eliminada' } };
    } catch (error) {
      throw { response: { status: 500, data: { message: 'Error interno del servidor' } } };
    }
  }
}

export default new MediacionesApi();