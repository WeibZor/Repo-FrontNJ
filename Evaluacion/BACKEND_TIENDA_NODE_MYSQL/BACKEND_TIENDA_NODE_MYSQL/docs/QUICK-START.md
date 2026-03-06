# 🚀 Guía de Inicio Rápido - Backend Tienda Node MySQL

## Paso 1: Verificar Requisitos

Asegúrate de tener instalado:
- **Node.js** 14+ (verifica con: `node -v`)
- **MySQL** 5.7+ o **MariaDB** (verifica con: `mysql --version`)

## Paso 2: Descargar e Instalar Dependencias

```powershell
# Navega a la carpeta del proyecto
cd BACKEND_TIENDA_NODE_MYSQL

# Instala las dependencias
npm install
```

## Paso 3: Configurar Variables de Entorno

Edita el archivo `.env` con tus credenciales de MySQL:

```env
# Configuración MySQL
DB_HOST=localhost      # Tu host de MySQL
DB_PORT=3306          # Puerto de MySQL (por defecto 3306)
DB_USER=root          # Tu usuario de MySQL
DB_PASSWORD=          # Tu contraseña de MySQL (déjalo vacío si no tienes)
DB_NAME=inventario_db # Nombre de la base de datos

# Servidor
PORT=3000
NODE_ENV=development
```

## Paso 4: Inicializar la Base de Datos

```powershell
# Crea la BD y las tablas, e inserta datos de ejemplo
npm run init-db
```

Este comando:
- ✅ Crea la base de datos `inventario_db`
- ✅ Crea todas las tablas necesarias
- ✅ Inserta datos de ejemplo
- ✅ Configura índices y relaciones

## Paso 5: Iniciar el Servidor

```powershell
# Modo producción
npm start

# O modo desarrollo (con reinicio automático)
npm run dev
```

Verás un mensaje similar a:
```
🚀 Servidor corriendo en http://localhost:3000
📚 API Base URL: http://localhost:3000/api
💾 Base de datos MySQL: inventario_db
```

## Paso 6: Probar la API

Abre VS Code con la extensión REST Client y prueba los endpoints en `peticiones-mysql.http`

O usa curl:
```powershell
# Login
curl -X POST http://localhost:3000/api/login `
  -H "Content-Type: application/json" `
  -d '{"usuario":"admin","contrasena":"admin12345"}'

# Obtener productos
curl http://localhost:3000/api/productos
```

## 🔐 Credenciales de Prueba

**Usuario Admin:**
- Usuario: `admin`
- Contraseña: `admin12345`

**Usuario Vendedor:**
- Usuario: `vendedor`
- Contraseña: `vendedor123`

## 📊 Clientes de Ejemplo

| Nombre | Email | Teléfono |
|---|---|---|
| Alan Brito | alambre@gmail.com | 323399999 |
| Zoyla Vaca | vacalola@gmail.com | 322131444 |

## 📦 Productos de Ejemplo

| Producto | Precio | Stock |
|---|---|---|
| Perro | $22,000 | 20 |
| Hamburguesa | $30,000 | 5 |
| Pizza | $45,000 | 5 |

## ⚠️ Problemas Comunes y Soluciones

### **"Error: connect ECONNREFUSED 127.0.0.1:3306"**

**Causa:** MySQL no está ejecutándose

**Solución:**
```powershell
# En Windows - Inicia el servicio MySQL
net start MySQL80  # o el nombre de tu servicio MySQL

# En Windows (si usas XAMPP)
# Inicia Apache y MySQL desde XAMPP Control Panel
```

### **"Error: Unknown database 'inventario_db'"**

**Causa:** La base de datos no fue creada

**Solución:**
```powershell
npm run init-db
```

### **"Error: ER_ACCESS_DENIED_FOR_USER"**

**Causa:** Credenciales incorrectas en `.env`

**Solución:**
1. Verifica tu usuario y contraseña en `.env`
2. Prueba conectar directamente a MySQL:
```powershell
mysql -h localhost -u root -p
```

### **"Error: ER_DUP_ENTRY"**

**Causa:** Intentaste insertar un email o usuario duplicado

**Solución:** Usa valores únicos para email y usuario

## 🔄 Reiniciar/Resetear Base de Datos

Si necesitas empezar de cero:

```powershell
# Opción 1: Elimina manualmente la BD desde MySQL y ejecuta init-db
mysql -u root -p -e "DROP DATABASE IF EXISTS inventario_db;"
npm run init-db

# Opción 2: Conecta y ejecuta (solo desarrolladores avanzados)
mysql -u root -p inventario_db < scripts/init-db.sql
```

## 📝 Estructura del Proyecto

```
BACKEND_TIENDA_NODE_MYSQL/
├── server.js                 # Servidor principal con todas las rutas
├── scripts/
│   └── init-db.js           # Script para crear BD y datos iniciales
├── .env                     # Variables de entorno
├── .env.example             # Plantilla de variables
├── .gitignore
├── package.json             # Dependencias del proyecto
├── package-lock.json        # Lock de versiones
├── README.md                # Documentación completa
├── QUICK-START.md           # Este archivo
└── peticiones-mysql.http    # Ejemplos de endpoints (para REST Client)
```

## 🎯 Próximos Pasos

1. **Explora los endpoints** usando `peticiones-mysql.http`
2. **Lee la documentación** en `README.md`
3. **Personaliza** los datos según tus necesidades
4. **Desarrolla** tu aplicación frontend

## 📞 Obtener Ayuda

Consulta el archivo `README.md` para:
- Documentación completa de endpoints
- Esquema de base de datos
- Ejemplos de requests/responses
- Troubleshooting detallado

---

**¡Listo! Tu API está funcionando correctamente 🎉**
