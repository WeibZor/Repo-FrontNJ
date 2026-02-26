const express = require("express")
const {
  getDetallePedido,
  createDetallePedido,
  updateDetallePedido,
  deleteDetallePedido,
} = require("../controllers/detallePedidoController")

const router = express.Router()

// GET /api/detalle-pedido?id_pedido=1
router.get("/", getDetallePedido)

// POST /api/detalle-pedido
router.post("/", createDetallePedido)

// PUT /api/detalle-pedido/:id
router.put("/:id", updateDetallePedido)

// DELETE /api/detalle-pedido/:id
router.delete("/:id", deleteDetallePedido)

module.exports = router
