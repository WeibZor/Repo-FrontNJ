const express = require("express")
const { getProductos, createProducto, updateProducto, deleteProducto } = require("../controllers/productosController")

const router = express.Router()

// GET /api/productos
// GET /api/productos/:id
router.get("/:id?", getProductos)

// POST /api/productos
router.post("/", createProducto)

// PUT /api/productos/:id
router.put("/:id", updateProducto)

// DELETE /api/productos/:id
router.delete("/:id", deleteProducto)

module.exports = router
