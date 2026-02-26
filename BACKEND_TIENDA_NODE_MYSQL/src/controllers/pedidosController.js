const { getPool } = require("../database/connection")
const { handleError } = require("../utils/errorHandler")

// Obtener todos los pedidos o uno por ID
const getPedidos = async (req, res) => {
  try {
    const { id } = req.params
    const pool = getPool()
    const connection = await pool.getConnection()

    if (id) {
      // Obtener pedido con información del cliente
      const [pedidos] = await connection.query(
        `SELECT p.*, c.nombre, c.apellido, c.email 
        FROM pedido p 
        INNER JOIN clientes c ON p.id_cliente = c.id_cliente 
        WHERE p.id = ?`,
        [id],
      )

      if (pedidos.length > 0) {
        const pedido = pedidos[0]

        // Obtener detalles del pedido
        const [detalles] = await connection.query(
          `SELECT dp.*, pr.nombre as producto_nombre 
          FROM detalle_pedido dp 
          INNER JOIN productos pr ON dp.id_producto = pr.id 
          WHERE dp.id_pedido = ?`,
          [id],
        )

        pedido.detalles = detalles
        res.json(pedido)
      } else {
        res.status(404).json({ message: "Pedido no encontrado" })
      }
    } else {
      const [rows] = await connection.query(
        `SELECT p.*, c.nombre, c.apellido, c.email 
        FROM pedido p 
        INNER JOIN clientes c ON p.id_cliente = c.id_cliente 
        ORDER BY p.id DESC`,
      )
      res.json(rows)
    }

    connection.release()
  } catch (error) {
    handleError(res, error, "Error al obtener pedidos")
  }
}

// Crear pedido
const createPedido = async (req, res) => {
  try {
    const { id_cliente, descuento, metodo_pago, aumento, productos } = req.body

    if (!id_cliente || !metodo_pago || !productos || productos.length === 0) {
      return res.status(400).json({ message: "Cliente, método de pago y productos son requeridos" })
    }

    const pool = getPool()
    const connection = await pool.getConnection()

    try {
      await connection.beginTransaction()

      // Crear el pedido
      const [pedidoResult] = await connection.query(
        "INSERT INTO pedido (id_cliente, descuento, metodo_pago, aumento) VALUES (?, ?, ?, ?)",
        [id_cliente, descuento || 0, metodo_pago, aumento || 0],
      )
      const pedidoId = pedidoResult.insertId

      // Agregar productos al detalle del pedido
      for (const producto of productos) {
        await connection.query(
          "INSERT INTO detalle_pedido (id_pedido, id_producto, precio, cantidad) VALUES (?, ?, ?, ?)",
          [pedidoId, producto.id_producto, producto.precio, producto.cantidad],
        )

        // Actualizar stock
        await connection.query("UPDATE productos SET stock = stock - ? WHERE id = ?", [
          producto.cantidad,
          producto.id_producto,
        ])
      }

      await connection.commit()

      res.status(201).json({
        message: "Pedido creado con éxito",
        id: pedidoId,
      })
    } catch (error) {
      await connection.rollback()
      throw error
    } finally {
      connection.release()
    }
  } catch (error) {
    handleError(res, error, "Error al crear pedido")
  }
}

// Actualizar pedido
const updatePedido = async (req, res) => {
  try {
    const { id } = req.params
    const { id_cliente, descuento, metodo_pago, aumento } = req.body

    const pool = getPool()
    const connection = await pool.getConnection()
    const [result] = await connection.query(
      "UPDATE pedido SET id_cliente = ?, descuento = ?, metodo_pago = ?, aumento = ? WHERE id = ?",
      [id_cliente, descuento, metodo_pago, aumento, id],
    )
    connection.release()

    if (result.affectedRows > 0) {
      res.json({ message: "Pedido actualizado con éxito" })
    } else {
      res.status(404).json({ message: "Pedido no encontrado" })
    }
  } catch (error) {
    handleError(res, error, "Error al actualizar pedido")
  }
}

// Eliminar pedido
const deletePedido = async (req, res) => {
  try {
    const { id } = req.params

    const pool = getPool()
    const connection = await pool.getConnection()
    const [result] = await connection.query("DELETE FROM pedido WHERE id = ?", [id])
    connection.release()

    if (result.affectedRows > 0) {
      res.json({ message: "Pedido eliminado con éxito" })
    } else {
      res.status(404).json({ message: "Pedido no encontrado" })
    }
  } catch (error) {
    handleError(res, error, "Error al eliminar pedido")
  }
}

module.exports = {
  getPedidos,
  createPedido,
  updatePedido,
  deletePedido,
}
