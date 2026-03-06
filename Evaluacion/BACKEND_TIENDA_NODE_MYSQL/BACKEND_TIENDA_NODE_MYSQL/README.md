# 🗄️ API REST Inventario - MySQL Edition

API REST completa para sistema de inventario desarrollada en Node.js con Express y MySQL.

## 🚀 Instalación Rápida

```CMD
# 1. Instalar dependencias
npm install

# 2. Configurar variables de entorno
# Edita el archivo .env con tus credenciales de MySQL

# 3. Inicializar base de datos (opcional, se hace automáticamente)
npm run init-db

# 4. Iniciar servidor
npm start
```

## 📋 Requisitos Previos

- **Node.js** >= 14.0.0
- **MySQL** >= 5.7 o **MariaDB** >= 10.3
- MySQL debe estar ejecutándose en tu equipo

## 📁 Estructura de Archivos

```
BACKEND_TIENDA_NODE_MYSQL/
├── server.js              # Servidor principal
├── scripts/
│   └── init-db.js         # Script de inicialización de BD
├── .env                   # Configuración de variables de entorno
├── .gitignore
├── package.json
├── peticiones-mysql.http  # Documentación de endpoints
└── README.md
```

## 🛠️ Scripts Disponibles

```CMD
npm start           # Iniciar servidor
npm run dev         # Desarrollo con nodemon
npm run init-db     # Inicializar/resetear base de datos
```

## 💾 Configuración de Base de Datos

### **Variables de Entorno (.env)**

```env
# Conexión MySQL
DB_HOST=localhost      # Host del servidor MySQL
DB_PORT=3306          # Puerto (por defecto 3306)
DB_USER=root          # Usuario MySQL
DB_PASSWORD=          # Contraseña MySQL (vacía por defecto)
DB_NAME=inventario_db # Nombre de la base de datos

# Servidor
PORT=3000             # Puerto del API
NODE_ENV=development  # Entorno (development o production)
```

### **Datos de Ejemplo**

Al inicializar, se crean automáticamente:
- **Usuario admin**: admin / admin12345
- **Usuario vendedor**: vendedor / vendedor123
- **2 clientes** de ejemplo (Alan Brito, Zoyla Vaca)
- **3 productos** de ejemplo (Perro, Hamburguesa, Pizza)

### **Crear Base de Datos Manualmente**

Si prefieres crear la base de datos manualmente en MySQL:

```sql
CREATE DATABASE inventario_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

## 📊 Esquema de Base de Datos

### **Tabla: productos**
```sql
CREATE TABLE productos (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(100) NOT NULL,
  descripcion VARCHAR(255),
  precio DECIMAL(10, 2) NOT NULL,
  stock INT NOT NULL DEFAULT 0,
  imagen VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### **Tabla: clientes**
```sql
CREATE TABLE clientes (
  id_cliente INT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(100) NOT NULL,
  apellido VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  celular VARCHAR(20) NOT NULL,
  direccion VARCHAR(150) NOT NULL,
  direccion2 VARCHAR(150),
  descripcion VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### **Tabla: roles (usuarios)**
```sql
CREATE TABLE roles (
  id INT PRIMARY KEY AUTO_INCREMENT,
  rol VARCHAR(50) NOT NULL,
  usuario VARCHAR(50) NOT NULL UNIQUE,
  contrasena VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### **Tabla: pedido**
```sql
CREATE TABLE pedido (
  id INT PRIMARY KEY AUTO_INCREMENT,
  id_cliente INT NOT NULL,
  descuento DECIMAL(10, 2) DEFAULT 0,
  metodo_pago VARCHAR(50) NOT NULL,
  aumento DECIMAL(10, 2) DEFAULT 0,
  fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_cliente) REFERENCES clientes (id_cliente) ON DELETE CASCADE
);
```

### **Tabla: detalle_pedido**
```sql
CREATE TABLE detalle_pedido (
  id INT PRIMARY KEY AUTO_INCREMENT,
  id_pedido INT NOT NULL,
  id_producto INT NOT NULL,
  precio DECIMAL(10, 2) NOT NULL,
  cantidad INT NOT NULL,
  FOREIGN KEY (id_pedido) REFERENCES pedido (id) ON DELETE CASCADE,
  FOREIGN KEY (id_producto) REFERENCES productos (id) ON DELETE CASCADE
);
```

## 🔐 Endpoints de Autenticación

### **Login**
```http
POST /api/login
Content-Type: application/json

{
  "usuario": "admin",
  "contrasena": "admin12345"
}
```

**Respuesta exitosa (200):**
```json
{
  "id": 1,
  "rol": "administrador",
  "usuario": "admin"
}
```

## 📦 Endpoints de Productos

### **Obtener todos los productos**
```http
GET /api/productos
```

### **Obtener producto por ID**
```http
GET /api/productos/1
```

### **Crear producto**
```http
POST /api/productos
Content-Type: application/json

{
  "nombre": "Arepa",
  "descripcion": "Arepa con queso",
  "precio": 8000,
  "stock": 50,
  "imagen": "https://example.com/arepa.jpg"
}
```

### **Actualizar producto**
```http
PUT /api/productos/1
Content-Type: application/json

{
  "nombre": "Arepa Especial",
  "descripcion": "Arepa con queso y jamón",
  "precio": 10000,
  "stock": 40,
  "imagen": "https://example.com/arepa-especial.jpg"
}
```

### **Eliminar producto**
```http
DELETE /api/productos/1
```

## 👥 Endpoints de Clientes

### **Obtener todos los clientes**
```http
GET /api/clientes
```

### **Obtener cliente por ID**
```http
GET /api/clientes/1
```

### **Crear cliente**
```http
POST /api/clientes
Content-Type: application/json

{
  "nombre": "Juan",
  "apellido": "Pérez",
  "email": "juan@example.com",
  "celular": "3001234567",
  "direccion": "Calle 1 #2-3",
  "direccion2": "Apartamento 101",
  "descripcion": "Cliente VIP"
}
```

### **Actualizar cliente**
```http
PUT /api/clientes/1
Content-Type: application/json

{
  "nombre": "Juan",
  "apellido": "Pérez García",
  "email": "juan.perez@example.com",
  "celular": "3009876543",
  "direccion": "Carrera 5 #10-20",
  "direccion2": "Casa 5",
  "descripcion": "Cliente regular"
}
```

### **Eliminar cliente**
```http
DELETE /api/clientes/1
```

## 🛒 Endpoints de Pedidos

### **Obtener todos los pedidos**
```http
GET /api/pedidos
```

### **Obtener pedido con detalles**
```http
GET /api/pedidos/1
```

### **Crear pedido**
```http
POST /api/pedidos
Content-Type: application/json

{
  "id_cliente": 1,
  "descuento": 5000,
  "metodo_pago": "PSE",
  "aumento": 0,
  "productos": [
    {
      "id_producto": 1,
      "precio": 22000,
      "cantidad": 2
    },
    {
      "id_producto": 2,
      "precio": 30000,
      "cantidad": 1
    }
  ]
}
```

### **Actualizar pedido**
```http
PUT /api/pedidos/1
Content-Type: application/json

{
  "id_cliente": 1,
  "descuento": 10000,
  "metodo_pago": "Transferencia",
  "aumento": 2000
}
```

### **Eliminar pedido**
```http
DELETE /api/pedidos/1
```

## 👤 Endpoints de Usuarios

### **Obtener todos los usuarios**
```http
GET /api/usuarios
```

### **Obtener usuario por ID**
```http
GET /api/usuarios/1
```

### **Crear usuario**
```http
POST /api/usuarios
Content-Type: application/json

{
  "rol": "cajero",
  "usuario": "carlos_cajero",
  "contrasena": "carlos123456"
}
```

### **Actualizar usuario (sin cambiar contraseña)**
```http
PUT /api/usuarios/1
Content-Type: application/json

{
  "rol": "administrador",
  "usuario": "carlos_admin"
}
```

### **Actualizar usuario (con nueva contraseña)**
```http
PUT /api/usuarios/1
Content-Type: application/json

{
  "rol": "vendedor",
  "usuario": "carlos_vendedor",
  "contrasena": "nueva_contrasena123"
}
```

### **Eliminar usuario**
```http
DELETE /api/usuarios/1
```

## 📋 Endpoints de Detalle de Pedido

### **Obtener detalles de pedido**
```http
GET /api/detalle-pedido?id_pedido=1
```

### **Agregar producto a pedido**
```http
POST /api/detalle-pedido
Content-Type: application/json

{
  "id_pedido": 1,
  "id_producto": 3,
  "precio": 45000,
  "cantidad": 1
}
```

### **Actualizar detalle de pedido**
```http
PUT /api/detalle-pedido/1
Content-Type: application/json

{
  "precio": 35000,
  "cantidad": 2
}
```

### **Eliminar detalle de pedido**
```http
DELETE /api/detalle-pedido/1
```

## 🔧 Troubleshooting

### **Error: "connect ECONNREFUSED"**
- Asegúrate de que MySQL está ejecutándose
- Verifica que las credenciales en `.env` son correctas

### **Error: "Unknown database"**
- Ejecuta `npm run init-db` para crear la base de datos
- Verifica que el nombre en `.env` (DB_NAME) es correcto

### **Error: "ER_DUP_ENTRY"**
- El email o usuario ya existe en la base de datos
- Usa un valor único

## 🚀 Diferencias con la versión SQLite

| Característica | SQLite | MySQL |
|---|---|---|
| Tipo de BD | Archivo local | Servidor remoto |
| Pool de conexiones | No | Sí (mejor rendimiento) |
| Transacciones | Síncrono | Asíncrono |
| Escalabilidad | Limitada | Excelente |
| Concurrencia | Limitada | Excelente |
| Backups | Copiar archivo | Exportar BD |

## 📝 Licencia

MIT

## 👨‍💼 Autor

Sistema de Inventario - CESDE
