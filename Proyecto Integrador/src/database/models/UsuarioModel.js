import { z } from 'zod';

const UsuarioSchema = z.object({
  id: z.number().optional(),
  nombre: z.string().min(1, 'Nombre es requerido'),
  apellido: z.string().min(1, 'Apellido es requerido'),
  tipoDocumento: z.string().min(1, 'Tipo de documento es requerido'),
  documento: z.string().min(1, 'Documento es requerido'),
  correo: z.string().email('Correo inválido'),
  password: z.string().min(6, 'Contraseña debe tener al menos 6 caracteres'),
  telefono: z.string().min(1, 'Teléfono es requerido'),
  perfilId: z.number().min(1, 'Perfil es requerido'),
  activo: z.boolean().default(true),
  fechaAlta: z.string().optional(),
  usuarioAltaId: z.number().optional(),
  avatar: z.string().optional(),
  banner: z.string().optional(),
  biografia: z.string().optional(),
  redesSociales: z.object({
    linkedin: z.string().optional(),
    twitter: z.string().optional(),
    facebook: z.string().optional()
  }).optional(),
  estadoOnline: z.boolean().default(false),
  actividad: z.string().optional()
});

class UsuarioModel {
  static validate(data) {
    return UsuarioSchema.parse(data);
  }

  static normalize(data) {
    return {
      ...data,
      fechaAlta: data.fechaAlta || new Date().toISOString(),
      actividad: data.actividad || new Date().toISOString()
    };
  }
}

export default UsuarioModel;