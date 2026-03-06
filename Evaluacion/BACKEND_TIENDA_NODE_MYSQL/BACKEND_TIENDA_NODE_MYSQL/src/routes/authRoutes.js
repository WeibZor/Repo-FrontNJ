const express = require("express")
const { login } = require("../controllers/authController")

const router = express.Router()

// POST /api/login
router.post("/login", login)

module.exports = router
