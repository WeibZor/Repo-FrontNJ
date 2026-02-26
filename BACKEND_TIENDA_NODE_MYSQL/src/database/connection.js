const mysql = require("mysql2/promise")
require("dotenv").config()

const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "inventario_db",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
}

let pool

const initializePool = async () => {
  try {
    pool = mysql.createPool(dbConfig)
    console.log("✅ Pool de conexiones MySQL creado correctamente")
  } catch (error) {
    console.error("❌ Error al crear el pool de conexiones:", error.message)
    process.exit(1)
  }
}

const getPool = () => pool

const closePool = async () => {
  if (pool) {
    await pool.end()
  }
}

module.exports = {
  initializePool,
  getPool,
  closePool,
}
