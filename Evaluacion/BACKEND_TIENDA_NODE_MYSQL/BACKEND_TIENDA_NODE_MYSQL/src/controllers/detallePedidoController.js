const { getPool } = require("../database/connection")
const { handleError } = require("../utils/errorHandler")

// Obtener detalles de un pedido específico
const getDetallePedido = async (req, res) => {
  try {
    const { id_pedido } = req.query

    if (!id_pedido) {
      return res.status(400).json({ message: "ID de pedido requerido" })
    }

    const pool = getPool()
    const connection = await pool.getConnection()
    const [rows] = await connection.query(
      `SELECT dp.*, pr.nombre as producto_nombre, pr.imagen 
      FROM detalle_pedido dp 
      INNER JOIN productos pr ON dp.id_producto = pr.id 
      WHERE dp.id_pedido = ?`,
      [id_pedido],
    )
    connection.release()

    res.json(rows)
  } catch (error) {
    handleError(res, error, "Error al obtener detalles")
  }
}

// Agregar producto a un pedido existente
const createDetallePedido = async (req, res) => {
  try {
    const { id_pedido, id_producto, precio, cantidad } = req.body

    if (!id_pedido || !id_producto || !precio || !cantidad) {
      return res.status(400).json({ message: "Todos los campos son requeridos" })
    }

    const pool = getPool()
    const connection = await pool.getConnection()
    const [result] = await connection.query(
      "INSERT INTO detalle_pedido (id_pedido, id_producto, precio, cantidad) VALUES (?, ?, ?, ?)",
      [id_pedido, id_producto, precio, cantidad],
    )
    connection.release()

    res.status(201).json({
      message: "Detalle agregado con éxito",
      id: result.insertId,
    })
  } catch (error) {
    handleError(res, error, "Error al crear detalle")
  }
}

// Actualizar detalle de pedido
const updateDetallePedido = async (req, res) => {
  try {
    const { id } = req.params
    const { precio, cantidad } = req.body

    const pool = getPool()
    const connection = await pool.getConnection()
    const [result] = await connection.query("UPDATE detalle_pedido SET precio = ?, cantidad = ? WHERE id = ?", [
      precio,
      cantidad,
      id,
    ])
    connection.release()

    if (result.affectedRows > 0) {
      res.json({ message: "Detalle actualizado con éxito" })
    } else {
      res.status(404).json({ message: "Detalle no encontrado" })
    }
  } catch (error) {
    handleError(res, error, "Error al actualizar detalle")
  }
}

// Eliminar detalle de pedido
const deleteDetallePedido = async (req, res) => {
  try {
    const { id } = req.params

    const pool = getPool()
    const connection = await pool.getConnection()
    const [result] = await connection.query("DELETE FROM detalle_pedido WHERE id = ?", [id])
    connection.release()

    if (result.affectedRows > 0) {
      res.json({ message: "Detalle eliminado con éxito" })
    } else {
      res.status(404).json({ message: "Detalle no encontrado" })
    }
  } catch (error) {
    handleError(res, error, "Error al eliminar detalle")
  }
}

module.exports = {
  getDetallePedido,
  createDetallePedido,
  updateDetallePedido,
  deleteDetallePedido,
}
