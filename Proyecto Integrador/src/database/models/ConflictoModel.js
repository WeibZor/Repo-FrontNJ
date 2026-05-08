import { z } from 'zod';

const ConflictoSchema = z.object({
  id: z.number().optional(),
  usuarioDemandanteId: z.number().min(1, 'Demandante es requerido'),
  usuarioDemandadoId: z.number().min(1, 'Demandado es requerido'),
  tipoConflictoId: z.number().min(1, 'Tipo de conflicto es requerido'),
  estadoConflictoId: z.number().min(1, 'Estado es requerido'),
  asunto: z.string().min(1, 'Asunto es requerido'),
  descripcion: z.string().min(1, 'Descripción es requerida'),
  fechaInicio: z.string(),
  fechaCierre: z.string().optional(),
  resultado: z.string().optional(),
  montoReclamado: z.number().min(0, 'Monto debe ser positivo'),
  activo: z.boolean().default(true),
  fechaAlta: z.string().optional()
});

class ConflictoModel {
  static validate(data) {
    return ConflictoSchema.parse(data);
  }

  static normalize(data) {
    return {
      ...data,
      fechaAlta: data.fechaAlta || new Date().toISOString(),
      fechaInicio: data.fechaInicio || new Date().toISOString()
    };
  }
}

export default ConflictoModel;