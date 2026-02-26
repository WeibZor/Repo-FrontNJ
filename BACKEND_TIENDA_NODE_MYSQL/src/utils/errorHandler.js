const handleError = (res, error, message = "Error interno del servidor") => {
  console.error("Error:", error)
  res.status(500).json({ message: message + ": " + error.message })
}

module.exports = { handleError }
