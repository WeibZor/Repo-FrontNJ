const { getPool } = require("../database/connection")
const { handleError } = require("../utils/errorHandler")

// Obtener todos los productos o uno por ID
const getProductos = async (req, res) => {
  try {
    const { id } = req.params
    const pool = getPool()
    const connection = await pool.getConnection()

    if (id) {
      const [rows] = await connection.query("SELECT * FROM productos WHERE id = ?", [id])
      connection.release()

      if (rows.length > 0) {
        res.json(rows[0])
      } else {
        res.status(404).json({ message: "Producto no encontrado" })
      }
    } else {
      const [rows] = await connection.query("SELECT * FROM productos ORDER BY id DESC")
      connection.release()
      res.json(rows)
    }
  } catch (error) {
    handleError(res, error, "Error al obtener productos")
  }
}

// Crear producto
const createProducto = async (req, res) => {
  try {
    const { nombre, descripcion, precio, stock, imagen } = req.body

    if (!nombre || !precio || stock === undefined) {
      return res.status(400).json({ message: "Nombre, precio y stock son requeridos" })
    }

    const pool = getPool()
    const connection = await pool.getConnection()
    const [result] = await connection.query(
      "INSERT INTO productos (nombre, descripcion, precio, stock, imagen) VALUES (?, ?, ?, ?, ?)",
      [nombre, descripcion || "", precio, stock, imagen || ""],
    )
    connection.release()

    res.status(201).json({
      message: "Producto creado con éxito",
      id: result.insertId,
    })
  } catch (error) {
    handleError(res, error, "Error al crear producto")
  }
}

// Actualizar producto
const updateProducto = async (req, res) => {
  try {
    const { id } = req.params
    const { nombre, descripcion, precio, stock, imagen } = req.body

    const pool = getPool()
    const connection = await pool.getConnection()
    const [result] = await connection.query(
      "UPDATE productos SET nombre = ?, descripcion = ?, precio = ?, stock = ?, imagen = ?, updated_at = NOW() WHERE id = ?",
      [nombre, descripcion, precio, stock, imagen, id],
    )
    connection.release()

    if (result.affectedRows > 0) {
      res.json({ message: "Producto actualizado con éxito" })
    } else {
      res.status(404).json({ message: "Producto no encontrado" })
    }
  } catch (error) {
    handleError(res, error, "Error al actualizar producto")
  }
}

// Eliminar producto
const deleteProducto = async (req, res) => {
  try {
    const { id } = req.params

    const pool = getPool()
    const connection = await pool.getConnection()
    const [result] = await connection.query("DELETE FROM productos WHERE id = ?", [id])
    connection.release()

    if (result.affectedRows > 0) {
      res.json({ message: "Producto eliminado con éxito" })
    } else {
      res.status(404).json({ message: "Producto no encontrado" })
    }
  } catch (error) {
    handleError(res, error, "Error al eliminar producto")
  }
}

module.exports = {
  getProductos,
  createProducto,
  updateProducto,
  deleteProducto,
}
