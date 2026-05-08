import { z } from 'zod';

const MediacionSchema = z.object({
  id: z.number().optional(),
  conflictoId: z.number().min(1, 'Conflicto es requerido'),
  usuarioMediadorId: z.number().min(1, 'Mediador es requerido'),
  estadoConflictoId: z.number().min(1, 'Estado es requerido'),
  fechaProgramada: z.string(),
  lugar: z.string().min(1, 'Lugar es requerido'),
  observaciones: z.string().optional(),
  resultado: z.string().optional(),
  fechaRegistro: z.string().optional(),
  activo: z.boolean().default(true)
});

class MediacionModel {
  static validate(data) {
    return MediacionSchema.parse(data);
  }

  static normalize(data) {
    return {
      ...data,
      fechaRegistro: data.fechaRegistro || new Date().toISOString()
    };
  }
}

export default MediacionModel;