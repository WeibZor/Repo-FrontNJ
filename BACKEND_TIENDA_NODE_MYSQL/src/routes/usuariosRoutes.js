const express = require("express")
const { getUsuarios, createUsuario, updateUsuario, deleteUsuario } = require("../controllers/usuariosController")

const router = express.Router()

// GET /api/usuarios
// GET /api/usuarios/:id
router.get("/:id?", getUsuarios)

// POST /api/usuarios
router.post("/", createUsuario)

// PUT /api/usuarios/:id
router.put("/:id", updateUsuario)

// DELETE /api/usuarios/:id
router.delete("/:id", deleteUsuario)

module.exports = router
