const express = require("express")
const { getClientes, createCliente, updateCliente, deleteCliente } = require("../controllers/clientesController")

const router = express.Router()

// GET /api/clientes
// GET /api/clientes/:id
router.get("/:id?", getClientes)

// POST /api/clientes
router.post("/", createCliente)

// PUT /api/clientes/:id
router.put("/:id", updateCliente)

// DELETE /api/clientes/:id
router.delete("/:id", deleteCliente)

module.exports = router
