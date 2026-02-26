const { getPool } = require("../database/connection")
const { handleError } = require("../utils/errorHandler")

// Obtener todos los usuarios o uno por ID
const getUsuarios = async (req, res) => {
  try {
    const { id } = req.params
    const pool = getPool()
    const connection = await pool.getConnection()

    if (id) {
      const [rows] = await connection.query("SELECT id, rol, usuario FROM roles WHERE id = ?", [id])
      connection.release()

      if (rows.length > 0) {
        res.json(rows[0])
      } else {
        res.status(404).json({ message: "Usuario no encontrado" })
      }
    } else {
      const [rows] = await connection.query("SELECT id, rol, usuario FROM roles ORDER BY id DESC")
      connection.release()
      res.json(rows)
    }
  } catch (error) {
    handleError(res, error, "Error al obtener usuarios")
  }
}

// Crear usuario
const createUsuario = async (req, res) => {
  try {
    const { rol, usuario, contrasena } = req.body

    if (!rol || !usuario || !contrasena) {
      return res.status(400).json({ message: "Rol, usuario y contraseña son requeridos" })
    }

    const pool = getPool()
    const connection = await pool.getConnection()
    try {
      const [result] = await connection.query("INSERT INTO roles (rol, usuario, contrasena) VALUES (?, ?, ?)", [
        rol,
        usuario,
        contrasena,
      ])

      res.status(201).json({
        message: "Usuario creado con éxito",
        id: result.insertId,
      })
    } catch (err) {
      if (err.code === "ER_DUP_ENTRY") {
        res.status(409).json({ message: "El usuario ya existe" })
      } else {
        throw err
      }
    } finally {
      connection.release()
    }
  } catch (error) {
    handleError(res, error, "Error al crear usuario")
  }
}

// Actualizar usuario
const updateUsuario = async (req, res) => {
  try {
    const { id } = req.params
    const { rol, usuario, contrasena } = req.body

    const pool = getPool()
    const connection = await pool.getConnection()

    let result
    if (contrasena) {
      const [res_update] = await connection.query(
        "UPDATE roles SET rol = ?, usuario = ?, contrasena = ?, updated_at = NOW() WHERE id = ?",
        [rol, usuario, contrasena, id],
      )
      result = res_update
    } else {
      const [res_update] = await connection.query(
        "UPDATE roles SET rol = ?, usuario = ?, updated_at = NOW() WHERE id = ?",
        [rol, usuario, id],
      )
      result = res_update
    }

    connection.release()

    if (result.affectedRows > 0) {
      res.json({ message: "Usuario actualizado con éxito" })
    } else {
      res.status(404).json({ message: "Usuario no encontrado" })
    }
  } catch (error) {
    handleError(res, error, "Error al actualizar usuario")
  }
}

// Eliminar usuario
const deleteUsuario = async (req, res) => {
  try {
    const { id } = req.params

    const pool = getPool()
    const connection = await pool.getConnection()
    const [result] = await connection.query("DELETE FROM roles WHERE id = ?", [id])
    connection.release()

    if (result.affectedRows > 0) {
      res.json({ message: "Usuario eliminado con éxito" })
    } else {
      res.status(404).json({ message: "Usuario no encontrado" })
    }
  } catch (error) {
    handleError(res, error, "Error al eliminar usuario")
  }
}

module.exports = {
  getUsuarios,
  createUsuario,
  updateUsuario,
  deleteUsuario,
}
