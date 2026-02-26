const { getPool } = require("../database/connection")
const { handleError } = require("../utils/errorHandler")

// Obtener todos los clientes o uno por ID
const getClientes = async (req, res) => {
  try {
    const { id } = req.params
    const pool = getPool()
    const connection = await pool.getConnection()

    if (id) {
      const [rows] = await connection.query("SELECT * FROM clientes WHERE id_cliente = ?", [id])
      connection.release()

      if (rows.length > 0) {
        res.json(rows[0])
      } else {
        res.status(404).json({ message: "Cliente no encontrado" })
      }
    } else {
      const [rows] = await connection.query("SELECT * FROM clientes ORDER BY id_cliente DESC")
      connection.release()
      res.json(rows)
    }
  } catch (error) {
    handleError(res, error, "Error al obtener clientes")
  }
}

// Crear cliente
const createCliente = async (req, res) => {
  try {
    const { nombre, apellido, email, celular, direccion, direccion2, descripcion } = req.body

    if (!nombre || !apellido || !email || !celular || !direccion) {
      return res.status(400).json({ message: "Nombre, apellido, email, celular y dirección son requeridos" })
    }

    const pool = getPool()
    const connection = await pool.getConnection()
    try {
      const [result] = await connection.query(
        "INSERT INTO clientes (nombre, apellido, email, celular, direccion, direccion2, descripcion) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [nombre, apellido, email, celular, direccion, direccion2 || "", descripcion || ""],
      )

      res.status(201).json({
        message: "Cliente creado con éxito",
        id: result.insertId,
      })
    } catch (err) {
      if (err.code === "ER_DUP_ENTRY") {
        res.status(409).json({ message: "El email ya está registrado" })
      } else {
        throw err
      }
    } finally {
      connection.release()
    }
  } catch (error) {
    handleError(res, error, "Error al crear cliente")
  }
}

// Actualizar cliente
const updateCliente = async (req, res) => {
  try {
    const { id } = req.params
    const { nombre, apellido, email, celular, direccion, direccion2, descripcion } = req.body

    const pool = getPool()
    const connection = await pool.getConnection()
    const [result] = await connection.query(
      "UPDATE clientes SET nombre = ?, apellido = ?, email = ?, celular = ?, direccion = ?, direccion2 = ?, descripcion = ?, updated_at = NOW() WHERE id_cliente = ?",
      [nombre, apellido, email, celular, direccion, direccion2, descripcion, id],
    )
    connection.release()

    if (result.affectedRows > 0) {
      res.json({ message: "Cliente actualizado con éxito" })
    } else {
      res.status(404).json({ message: "Cliente no encontrado" })
    }
  } catch (error) {
    handleError(res, error, "Error al actualizar cliente")
  }
}

// Eliminar cliente
const deleteCliente = async (req, res) => {
  try {
    const { id } = req.params

    const pool = getPool()
    const connection = await pool.getConnection()
    const [result] = await connection.query("DELETE FROM clientes WHERE id_cliente = ?", [id])
    connection.release()

    if (result.affectedRows > 0) {
      res.json({ message: "Cliente eliminado con éxito" })
    } else {
      res.status(404).json({ message: "Cliente no encontrado" })
    }
  } catch (error) {
    handleError(res, error, "Error al eliminar cliente")
  }
}

module.exports = {
  getClientes,
  createCliente,
  updateCliente,
  deleteCliente,
}
