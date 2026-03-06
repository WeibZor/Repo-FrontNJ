const express = require("express")
const { getPedidos, createPedido, updatePedido, updateEstadoPedido, deletePedido } = require("../controllers/pedidosController")

const router = express.Router()

// GET /api/pedidos
// GET /api/pedidos/:id
router.get("/:id?", getPedidos)

// POST /api/pedidos
router.post("/", createPedido)

// PUT /api/pedidos/:id
router.put("/:id", updatePedido)

// PATCH /api/pedidos/:id/estado
router.patch("/:id/estado", updateEstadoPedido)

// DELETE /api/pedidos/:id
router.delete("/:id", deletePedido)

module.exports = router
