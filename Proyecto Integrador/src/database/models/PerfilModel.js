import { z } from 'zod';

const PerfilSchema = z.object({
  id: z.number().optional(),
  nombre: z.string().min(1, 'Nombre es requerido'),
  descripcion: z.string().min(1, 'Descripción es requerida'),
  activo: z.boolean().default(true),
  fechaAlta: z.string().optional()
});

class PerfilModel {
  static validate(data) {
    return PerfilSchema.parse(data);
  }

  static normalize(data) {
    return {
      ...data,
      fechaAlta: data.fechaAlta || new Date().toISOString()
    };
  }
}

export default PerfilModel;