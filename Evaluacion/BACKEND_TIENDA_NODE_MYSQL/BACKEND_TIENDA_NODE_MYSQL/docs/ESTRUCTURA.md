# 📁 Estructura del Proyecto Refactorizado

El proyecto ha sido reorganizado para mejor mantenimiento y escalabilidad.

## 🗂️ Árbol de Carpetas

```
BACKEND_TIENDA_NODE_MYSQL/
├── src/
│   ├── controllers/          # Lógica de negocio
│   │   ├── authController.js
│   │   ├── productosController.js
│   │   ├── clientesController.js
│   │   ├── pedidosController.js
│   │   ├── usuariosController.js
│   │   └── detallePedidoController.js
│   │
│   ├── routes/              # Definición de rutas
│   │   ├── authRoutes.js
│   │   ├── productosRoutes.js
│   │   ├── clientesRoutes.js
│   │   ├── pedidosRoutes.js
│   │   ├── usuariosRoutes.js
│   │   └── detallePedidoRoutes.js
│   │
│   ├── database/            # Configuración de BD
│   │   ├── connection.js    # Pool de conexiones
│   │   └── init.js          # Inicialización de tablas
│   │
│   └── utils/               # Utilidades
│       └── errorHandler.js  # Manejo de errores
│
├── scripts/
│   └── init-db.js           # Script de inicialización
│
├── server.js                # Archivo principal (limpio)
├── package.json
├── .env
├── .gitignore
├── README.md
├── QUICK-START.md
└── peticiones-mysql.http
```

## 📝 Descripción de Carpetas

### `src/controllers`
Contiene la lógica de negocio. Cada archivo es un controlador que maneja las operaciones de un recurso:
- **authController.js** - Autenticación (login)
- **productosController.js** - CRUD de productos
- **clientesController.js** - CRUD de clientes
- **pedidosController.js** - CRUD de pedidos
- **usuariosController.js** - CRUD de usuarios
- **detallePedidoController.js** - CRUD de detalles de pedido

### `src/routes`
Define las rutas HTTP y mapea con los controllers:
- Cada archivo de ruta importa sus funciones controladoras
- Defines GET, POST, PUT, DELETE para cada recurso
- Las rutas se importan en `server.js` y se registran en la aplicación

### `src/database`
Gestiona la conexión y configuración de la base de datos:
- **connection.js** - Crea y exporta el pool de conexiones
- **init.js** - Crea tablas e inserta datos de ejemplo

### `src/utils`
Utilidades compartidas:
- **errorHandler.js** - Función centralizada de manejo de errores

### `server.js` (Raíz)
Archivo principal limpio y organizado:
- Solo importa middlewares, rutas y funciones de BD
- Registra rutas de forma concisa
- Inicia el servidor

## 🔄 Flujo de una Solicitud

```
Cliente (REST)
    ↓
server.js (Router)
    ↓
routes/productosRoutes.js (Define ruta)
    ↓
controllers/productosController.js (Lógica)
    ↓
database/connection.js (Conexión a MySQL)
    ↓
Respuesta JSON
```

## 💡 Beneficios de esta Estructura

✅ **Separación de responsabilidades** - Cada archivo tiene una función clara
✅ **Fácil mantenimiento** - Código organizado y predecible
✅ **Escalabilidad** - Agregar nuevas rutas es sencillo
✅ **Reutilizable** - Controllers y funciones compartidas
✅ **Testing** - Cada módulo puede testearse independientemente
✅ **Colaborativo** - Múltiples desarrolladores pueden trabajar en paralelo

## 🚀 Agregar una Nueva Ruta

### 1. Crear un nuevo controller en `src/controllers/`

```javascript
// src/controllers/ejemploController.js
const { getPool } = require("../database/connection")
const { handleError } = require("../utils/errorHandler")

const getEjemplos = async (req, res) => {
  try {
    const pool = getPool()
    const connection = await pool.getConnection()
    const [rows] = await connection.query("SELECT * FROM ejemplo")
    connection.release()
    res.json(rows)
  } catch (error) {
    handleError(res, error, "Error al obtener ejemplos")
  }
}

module.exports = { getEjemplos }
```

### 2. Crear rutas en `src/routes/`

```javascript
// src/routes/ejemploRoutes.js
const express = require("express")
const { getEjemplos } = require("../controllers/ejemploController")

const router = express.Router()
router.get("/", getEjemplos)

module.exports = router
```

### 3. Registrar en `server.js`

```javascript
// En server.js
const ejemploRoutes = require("./src/routes/ejemploRoutes")
app.use("/api/ejemplo", ejemploRoutes)
```

¡Listo! Tu nueva ruta estará disponible en `/api/ejemplo`

## 🔐 Pool de Conexiones

El pool de conexiones se centraliza en `src/database/connection.js`:

```javascript
const { getPool } = require("./src/database/connection")

// En cualquier controller
const pool = getPool()
const connection = await pool.getConnection()
```

