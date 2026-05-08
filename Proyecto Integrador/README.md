# ConciliaYa

Plataforma de reconciliación de datos y gestión de gastos hormiga con autenticación local y rutas protegidas.

Datos de ejemplo inspirados en Colombia, usando nombres colombianos y gastos en pesos.
Soporta tipos de documento típicos como `CC`, `TI`, `Pasaporte`, `NIT` y `CE`.

## Estructura principal

- `src/main.jsx` - Punto de arranque de React.
- `src/App.jsx` - Enrutamiento y layout general.
- `src/context/AuthContext.jsx` - Lógica de autenticación y persistencia de sesión.
- `src/services/` - Mocks y funciones de datos para usuarios y gastos.
- `src/pages/` - Páginas de Login, Registro, Dashboard, Gastos y NotFound.
- `src/components/` - Componentes reutilizables como formulario de gasto y lista de gastos.

## Mapa de rutas

- `/` - Página de inicio con resumen y botones.
- `/login` - Login de usuario.
- `/register` - Registro de usuario.
- `/dashboard` - Área privada con información del usuario y navegación.
- `/expenses` - Ruta privada de gastos.
- `*` - Página 404.

## Protección de rutas

Las rutas privadas usan `PrivateRoute` y `AuthContext`.
Si el usuario no está autenticado, se redirige a `/login`.

## Dependencias nuevas

- `react-router-dom` - Enrutamiento dinámico y rutas protegidas.
- `vite` + `@vitejs/plugin-react` - Herramienta de desarrollo moderna.
- `src/assets/logo.svg` - Icono ligero para la aplicación.

## Instalación

```bash
npm install
npm run dev
```

## Notas

- Los datos de usuario y gastos se centralizan en `src/services/`.
- Los formularios son controlados con `useState`.
- La sesión se persiste en `localStorage` para simular autenticación.
