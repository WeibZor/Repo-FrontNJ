const { getPool } = require("../database/connection")
const { handleError } = require("../utils/errorHandler")

// Login de usuario
const login = async (req, res) => {
  try {
    const { usuario, contrasena } = req.body

    if (!usuario || !contrasena) {
      return res.status(400).json({ message: "Usuario y contraseña son requeridos" })
    }

    const pool = getPool()
    const connection = await pool.getConnection()
    const [rows] = await connection.query("SELECT id, rol, usuario FROM roles WHERE usuario = ? AND contrasena = ?", [
      usuario,
      contrasena,
    ])
    connection.release()

    if (rows.length > 0) {
      res.status(200).json(rows[0])
    } else {
      res.status(401).json({ message: "Credenciales incorrectas" })
    }
  } catch (error) {
    handleError(res, error, "Error al verificar el inicio de sesión")
  }
}

module.exports = {
  login,
}
