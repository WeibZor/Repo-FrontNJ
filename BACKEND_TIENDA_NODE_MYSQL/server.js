const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
require("dotenv").config()

// Importar funciones de conexión y BD
const { initializePool, closePool } = require("./src/database/connection")
const { initializeDatabase } = require("./src/database/init")

// Importar rutas
const authRoutes = require("./src/routes/authRoutes")
const productosRoutes = require("./src/routes/productosRoutes")
const clientesRoutes = require("./src/routes/clientesRoutes")
const pedidosRoutes = require("./src/routes/pedidosRoutes")
const usuariosRoutes = require("./src/routes/usuariosRoutes")
const detallePedidoRoutes = require("./src/routes/detallePedidoRoutes")

const app = express()
const PORT = process.env.PORT || 3000

// Middlewares
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Ruta raíz de bienvenida
app.get("/", (req, res) => {
  res.status(200).json({
    message: "¡Bienvenido a la API de Tienda!",
    version: "1.0.0",
    description: "API REST para gestión de inventario, productos, clientes y pedidos",
    author: "Sistema de Inventario - CESDE",
    endpoints: {
      authentication: {
        login: "POST /api/login"
      },
      resources: {
        productos: "GET /api/productos, POST /api/productos, PUT /api/productos/:id, DELETE /api/productos/:id",
        clientes: "GET /api/clientes, POST /api/clientes, PUT /api/clientes/:id, DELETE /api/clientes/:id",
        pedidos: "GET /api/pedidos, POST /api/pedidos, PUT /api/pedidos/:id, DELETE /api/pedidos/:id",
        usuarios: "GET /api/usuarios, POST /api/usuarios, PUT /api/usuarios/:id, DELETE /api/usuarios/:id",
        detallePedido: "GET /api/detalle-pedido, POST /api/detalle-pedido, PUT /api/detalle-pedido/:id, DELETE /api/detalle-pedido/:id"
      },
      documentation: "Ver README.md y peticiones-mysql.http",
      status: "En línea ✅"
    }
  })
})

// Rutas de la API
app.use("/api", authRoutes)
app.use("/api/productos", productosRoutes)
app.use("/api/clientes", clientesRoutes)
app.use("/api/pedidos", pedidosRoutes)
app.use("/api/usuarios", usuariosRoutes)
app.use("/api/detalle-pedido", detallePedidoRoutes)

// Ruta no encontrada - Captura rutas que no coinciden
app.use((req, res) => {
  res.status(404).json({
    error: "Ruta no encontrada",
    message: `La ruta '${req.method} ${req.originalUrl}' no existe en esta API`,
    suggestion: "Consulta GET / para ver los endpoints disponibles",
    status: 404
  })
})

// Iniciar servidor y pool de conexiones
const startServer = async () => {
  try {
    await initializePool()
    await initializeDatabase()

    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`)
      console.log(`📚 API Base URL: http://localhost:${PORT}/api`)
      console.log(`💾 Base de datos MySQL: ${process.env.DB_NAME || "inventario_db"}`)
    })
  } catch (error) {
    console.error("❌ Error al iniciar el servidor:", error.message)
    process.exit(1)
  }
}

// Cerrar pool de conexiones al terminar
process.on("SIGINT", async () => {
  console.log("\n🔒 Cerrando pool de conexiones MySQL...")
  await closePool()
  console.log("✅ Pool de conexiones cerrado correctamente")
  process.exit(0)
})

// Manejo de errores no capturados
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Promise Rejection:", err)
  process.exit(1)
})

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err)
  process.exit(1)
})

// Iniciar aplicación
startServer()
