const express = require("express")
const { getPedidos, createPedido, updatePedido, deletePedido } = require("../controllers/pedidosController")

const router = express.Router()

// GET /api/pedidos
// GET /api/pedidos/:id
router.get("/:id?", getPedidos)

// POST /api/pedidos
router.post("/", createPedido)

// PUT /api/pedidos/:id
router.put("/:id", updatePedido)

// DELETE /api/pedidos/:id
router.delete("/:id", deletePedido)

module.exports = router
