import { useAuth } from '../context/AuthContext';

export const useRoleAccess = () => {
  const { user } = useAuth();

  // Perfiles: 1 = Admin, 2 = Gestor, 3 = Usuario
  const isAdmin = user?.perfilId === 1;
  const isGestor = user?.perfilId === 2;
  const isUser = user?.perfilId === 3;

  const permissions = {
    // Usuarios
    viewAllUsers: isAdmin,
    createUser: isAdmin,
    editUser: isAdmin,
    deleteUser: isAdmin,
    changeUserRole: isAdmin,

    // Perfiles
    viewAllProfiles: isAdmin || isGestor,
    createProfile: isAdmin,
    editProfile: isAdmin,
    deleteProfile: isAdmin,

    // Conflictos
    viewAllConflicts: isAdmin || isGestor,
    createConflict: isAdmin || isGestor || isUser,
    editConflict: isAdmin || isGestor,
    deleteConflict: isAdmin,
    viewConflictDetails: true, // Todos ven

    // Mediaciones
    viewAllMediations: isAdmin || isGestor,
    createMediation: isAdmin || isGestor,
    editMediation: isAdmin || isGestor,
    deleteMediation: isAdmin,

    // Tipos y Estados
    viewTypesAndStates: isAdmin || isGestor,
    createTypesAndStates: isAdmin,
    editTypesAndStates: isAdmin,
    deleteTypesAndStates: isAdmin,

    // Estadísticas
    viewStatistics: isAdmin || isGestor,
    viewDetailedStats: isAdmin,

    // Feed
    viewFeed: true,
    createPost: true,
    deleteOwnPost: true,
    deleteAnyPost: isAdmin
  };

  const visibilityLevel = {
    // Qué información ve cada rol
    admin: {
      userFields: ['id', 'nombre', 'apellido', 'correo', 'telefono', 'perfilId', 'activo', 'fechaAlta', 'documento'],
      conflictFields: 'all',
      mediationFields: 'all'
    },
    gestor: {
      userFields: ['nombre', 'apellido', 'correo', 'telefono', 'perfilId'],
      conflictFields: ['id', 'asunto', 'tipoConflictoId', 'estadoConflictoId', 'montoReclamado', 'fechaInicio'],
      mediationFields: ['id', 'conflictoId', 'fechaMediacion', 'lugar', 'estadoConflictoId']
    },
    usuario: {
      userFields: ['nombre', 'apellido'],
      conflictFields: ['id', 'asunto', 'estadoConflictoId', 'fechaInicio'],
      mediationFields: ['fechaMediacion', 'lugar', 'estadoConflictoId']
    }
  };

  const getRoleLabel = () => {
    if (isAdmin) return 'Administrador';
    if (isGestor) return 'Gestor';
    return 'Usuario';
  };

  const filterDataByRole = (data, type) => {
    const role = isAdmin ? 'admin' : isGestor ? 'gestor' : 'usuario';
    const fields = visibilityLevel[role][`${type}Fields`];

    if (fields === 'all') return data;

    return data.map(item => {
      const filtered = {};
      fields.forEach(field => {
        if (field in item) {
          filtered[field] = item[field];
        }
      });
      return filtered;
    });
  };

  return {
    user,
    isAdmin,
    isGestor,
    isUser,
    permissions,
    visibilityLevel,
    getRoleLabel,
    filterDataByRole
  };
};

export default useRoleAccess;
