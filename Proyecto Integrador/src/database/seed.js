import db from './localDatabase.js';

const seedData = () => {
  // Perfiles
  const perfiles = [
    { id: 1, nombre: 'Administrador', descripcion: 'Acceso completo al sistema', activo: true, fechaAlta: new Date().toISOString() },
    { id: 2, nombre: 'Gestor', descripcion: 'Gestión de conflictos y mediaciones', activo: true, fechaAlta: new Date().toISOString() },
    { id: 3, nombre: 'Usuario', descripcion: 'Usuario básico', activo: true, fechaAlta: new Date().toISOString() }
  ];

  // Tipos de Conflicto
  const tiposConflicto = [
    { id: 1, nombre: 'Pago', descripcion: 'Conflictos relacionados con pagos', activo: true },
    { id: 2, nombre: 'Contrato', descripcion: 'Conflictos contractuales', activo: true },
    { id: 3, nombre: 'Servicio', descripcion: 'Conflictos de servicios', activo: true }
  ];

  // Estados de Conflicto
  const estadosConflicto = [
    { id: 1, nombre: 'Abierto', codigo: 'OPEN', descripcion: 'Conflicto iniciado', activo: true },
    { id: 2, nombre: 'En proceso', codigo: 'IN_PROGRESS', descripcion: 'Mediación en curso', activo: true },
    { id: 3, nombre: 'Cerrado', codigo: 'CLOSED', descripcion: 'Conflicto resuelto', activo: true }
  ];

  // Usuarios con nombres reales
  const usuarios = [];
  const nombresReales = [
    'María González', 'Carlos Rodríguez', 'Ana Martínez', 'Pedro López', 'Laura Hernández',
    'Diego Jiménez', 'Sofia Ruiz', 'Miguel Díaz', 'Isabella Morales', 'Juan Pérez',
    'Carmen Sánchez', 'Antonio Ramírez', 'Rosa Torres', 'Francisco Flores', 'Patricia Vargas',
    'Luis Castillo', 'Elena Morales', 'Roberto Navarro', 'Silvia Ortega', 'Fernando Delgado',
    'Teresa Medina', 'Alberto Guerrero', 'Cristina Rubio', 'Manuel Serrano', 'Lucía Domínguez',
    'Pablo Vega', 'Beatriz Gil', 'Sergio Cortés', 'Natalia Soto', 'Adrián Ramos'
  ];

  for (let i = 1; i <= 30; i++) {
    usuarios.push({
      id: i,
      nombre: nombresReales[i-1].split(' ')[0],
      apellido: nombresReales[i-1].split(' ')[1],
      tipoDocumento: 'DNI',
      documento: `1234567${i}`,
      correo: `usuario${i}@concilia.com`,
      password: `password${i}`,
      telefono: `+54911${Math.floor(Math.random() * 10000000)}`,
      perfilId: Math.floor(Math.random() * 3) + 1,
      activo: true,
      fechaAlta: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
      usuarioAltaId: 1,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`,
      banner: null,
      biografia: 'Profesional en resolución de conflictos.',
      redesSociales: { linkedin: `https://linkedin.com/in/user${i}` },
      estadoOnline: Math.random() > 0.5,
      actividad: new Date().toISOString()
    });
  }

  // Conflictos con situaciones reales
  const conflictos = [
    {
      id: 1,
      usuarioDemandanteId: 1,
      usuarioDemandadoId: 2,
      tipoConflictoId: 1,
      estadoConflictoId: 2,
      asunto: 'Agresión física entre vecinos',
      descripcion: 'El vecino ASDUo agredió físicamente a ASJDJSAU durante una discusión por ruidos molestos. El demandante sufrió lesiones leves y requiere compensación médica.',
      fechaInicio: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      fechaCierre: null,
      resultado: null,
      montoReclamado: 2500,
      activo: true,
      fechaAlta: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 2,
      usuarioDemandanteId: 3,
      usuarioDemandadoId: 4,
      tipoConflictoId: 2,
      estadoConflictoId: 1,
      asunto: 'Incumplimiento de contrato de alquiler',
      descripcion: 'El propietario no realizó las reparaciones prometidas en el contrato de alquiler, incluyendo pintura y arreglo de filtraciones.',
      fechaInicio: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
      fechaCierre: null,
      resultado: null,
      montoReclamado: 1200,
      activo: true,
      fechaAlta: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 3,
      usuarioDemandanteId: 5,
      usuarioDemandadoId: 6,
      tipoConflictoId: 3,
      estadoConflictoId: 3,
      asunto: 'Servicio de limpieza deficiente',
      descripcion: 'La empresa de limpieza no cumplió con el horario acordado y dejó áreas sin limpiar, afectando el funcionamiento del negocio.',
      fechaInicio: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
      fechaCierre: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      resultado: 'Acuerdo alcanzado: devolución del 50% del pago',
      montoReclamado: 800,
      activo: true,
      fechaAlta: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 4,
      usuarioDemandanteId: 7,
      usuarioDemandadoId: 8,
      tipoConflictoId: 1,
      estadoConflictoId: 1,
      asunto: 'Pago atrasado de servicios profesionales',
      descripcion: 'El cliente no pagó los honorarios por servicios de consultoría realizados, alegando insatisfacción con los resultados.',
      fechaInicio: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      fechaCierre: null,
      resultado: null,
      montoReclamado: 3500,
      activo: true,
      fechaAlta: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 5,
      usuarioDemandanteId: 9,
      usuarioDemandadoId: 10,
      tipoConflictoId: 2,
      estadoConflictoId: 2,
      asunto: 'Daños en propiedad alquilada',
      descripcion: 'El inquilino causó daños en la propiedad durante su permanencia, incluyendo roturas en muebles y paredes.',
      fechaInicio: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
      fechaCierre: null,
      resultado: null,
      montoReclamado: 1800,
      activo: true,
      fechaAlta: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString()
    }
  ];

  // Agregar más conflictos generados
  for (let i = 6; i <= 50; i++) {
    const situaciones = [
      'El proveedor entregó mercadería defectuosa',
      'Disputa por herencia familiar',
      'Problemas con servicio de internet',
      'Daños en vehículo por accidente',
      'Incumplimiento de garantía de producto',
      'Conflictos laborales por despido',
      'Problemas con construcción de obra',
      'Disputas por límites de propiedad',
      'Incumplimiento de contrato comercial',
      'Problemas con servicios médicos'
    ];
    conflictos.push({
      id: i,
      usuarioDemandanteId: Math.floor(Math.random() * 30) + 1,
      usuarioDemandadoId: Math.floor(Math.random() * 30) + 1,
      tipoConflictoId: Math.floor(Math.random() * 3) + 1,
      estadoConflictoId: Math.floor(Math.random() * 3) + 1,
      asunto: `Conflicto ${i}`,
      descripcion: situaciones[Math.floor(Math.random() * situaciones.length)],
      fechaInicio: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
      fechaCierre: Math.random() > 0.5 ? new Date().toISOString() : null,
      resultado: Math.random() > 0.5 ? 'Resuelto' : null,
      montoReclamado: Math.floor(Math.random() * 10000) + 100,
      activo: true,
      fechaAlta: new Date().toISOString()
    });
  }

  // Mediaciones
  const mediaciones = [
    {
      id: 1,
      conflictoId: 1,
      mediadorId: 15,
      estadoConflictoId: 2,
      fechaMediacion: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
      lugar: 'Oficina Central - Sala A',
      observaciones: 'Primera sesión de mediación. Ambas partes presentes. Se acordó próxima reunión.',
      resultado: null,
      fechaRegistro: new Date().toISOString(),
      activo: true
    },
    {
      id: 2,
      conflictoId: 2,
      mediadorId: 20,
      estadoConflictoId: 1,
      fechaMediacion: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
      lugar: 'Oficina Norte - Sala B',
      observaciones: 'Mediación programada para discutir reparaciones pendientes.',
      resultado: null,
      fechaRegistro: new Date().toISOString(),
      activo: true
    },
    {
      id: 3,
      conflictoId: 3,
      mediadorId: 25,
      estadoConflictoId: 3,
      fechaMediacion: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      lugar: 'Oficina Central - Sala C',
      observaciones: 'Mediación exitosa. Acuerdo alcanzado por devolución parcial.',
      resultado: 'Exitosa',
      fechaRegistro: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      activo: true
    }
  ];

  // Agregar más mediaciones generadas
  for (let i = 4; i <= 20; i++) {
    mediaciones.push({
      id: i,
      conflictoId: Math.floor(Math.random() * 50) + 1,
      mediadorId: Math.floor(Math.random() * 30) + 1,
      estadoConflictoId: Math.floor(Math.random() * 3) + 1,
      fechaMediacion: new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
      lugar: ['Oficina Central', 'Oficina Norte', 'Oficina Sur'][Math.floor(Math.random() * 3)],
      observaciones: `Observaciones para mediación ${i}`,
      resultado: Math.random() > 0.5 ? 'Exitosa' : null,
      fechaRegistro: new Date().toISOString(),
      activo: true
    });
  }

  // Publicaciones con contenido más realista
  const publicaciones = [
    {
      id: 1,
      usuarioId: 1,
      contenido: '¡Excelente sesión de mediación hoy! Logramos resolver un conflicto entre vecinos de manera pacífica. La comunicación es clave.',
      imagen: null,
      fechaCreacion: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      likes: 12,
      comentarios: 3
    },
    {
      id: 2,
      usuarioId: 5,
      contenido: 'Recordatorio: La mediación es una herramienta poderosa para resolver disputas sin necesidad de tribunales. ¿Han probado esta alternativa?',
      imagen: 'https://picsum.photos/400/300?random=1',
      fechaCreacion: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      likes: 8,
      comentarios: 5
    },
    {
      id: 3,
      usuarioId: 10,
      contenido: 'Felicitaciones al equipo por cerrar otro caso exitosamente. El cliente quedó muy satisfecho con el resultado.',
      imagen: null,
      fechaCreacion: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      likes: 15,
      comentarios: 2
    },
    {
      id: 4,
      usuarioId: 15,
      contenido: 'Importante: Mantengan la confidencialidad en todas las sesiones. La privacidad es fundamental para el éxito de la mediación.',
      imagen: null,
      fechaCreacion: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
      likes: 6,
      comentarios: 1
    },
    {
      id: 5,
      usuarioId: 20,
      contenido: 'Nuevo caso interesante: disputa contractual entre empresa y proveedor. ¿Alguien tiene experiencia similar?',
      imagen: null,
      fechaCreacion: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
      likes: 9,
      comentarios: 7
    }
  ];

  // Agregar más publicaciones generadas
  for (let i = 6; i <= 20; i++) {
    const contenidos = [
      'Compartiendo una lección aprendida de la mediación de hoy.',
      '¿Qué opinan sobre el uso de tecnología en procesos de mediación?',
      'Caso resuelto satisfactoriamente. ¡Orgullo de equipo!',
      'Recordatorio sobre la importancia de la neutralidad en mediación.',
      'Nuevo enfoque que funcionó muy bien en la última sesión.',
      'Pregunta para el equipo: ¿Cómo manejan situaciones de alta tensión?',
      'Compartiendo recursos útiles para mediadores.',
      'Reflexión sobre la evolución de la resolución de conflictos.',
      'Felicitaciones por el aniversario de la empresa.',
      'Actualización sobre el proyecto de mejora continua.'
    ];
    publicaciones.push({
      id: i,
      usuarioId: Math.floor(Math.random() * 30) + 1,
      contenido: contenidos[Math.floor(Math.random() * contenidos.length)],
      imagen: Math.random() > 0.5 ? `https://picsum.photos/400/300?random=${i}` : null,
      fechaCreacion: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
      likes: Math.floor(Math.random() * 50),
      comentarios: Math.floor(Math.random() * 10)
    });
  }

  // Set data
  db.setCollection('perfiles', perfiles);
  db.setCollection('tiposConflicto', tiposConflicto);
  db.setCollection('estadosConflicto', estadosConflicto);
  db.setCollection('usuarios', usuarios);
  db.setCollection('conflictos', conflictos);
  db.setCollection('mediaciones', mediaciones);
  db.setCollection('publicaciones', publicaciones);

  console.log('Datos iniciales sembrados.');
};

export default seedData;