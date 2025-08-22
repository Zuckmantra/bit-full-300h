// Importar dependencias
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config()

// Crear instancia de Express
const app = express()

// Configurar puerto
const PORT = process.env.PORT || 3000

// Middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Conexión a MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/proyecto-diplomado", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log("✅ Conexión exitosa a MongoDB")
  } catch (error) {
    console.error("❌ Error al conectar con MongoDB:", error.message)
    process.exit(1)
  }
}

// Conectar a la base de datos
connectDB()

// Importar modelos
const Usuario = require("./models/Usuario")

// Rutas básicas
app.get("/", (req, res) => {
  res.json({
    message: "🚀 Servidor backend funcionando correctamente",
    proyecto: "Diplomado Full Stack - Backend",
    version: "1.0.0",
    endpoints: {
      usuarios: "/api/usuarios",
      health: "/health",
    },
  })
})

// Endpoint de verificación de salud
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    database: mongoose.connection.readyState === 1 ? "Conectada" : "Desconectada",
  })
})

// Rutas de API
app.use("/api/usuarios", require("./routes/usuarios"))

// Middleware para rutas no encontradas
app.use("*", (req, res) => {
  res.status(404).json({
    error: "Ruta no encontrada",
    message: `La ruta ${req.originalUrl} no existe en este servidor`,
  })
})

// Middleware de manejo de errores
app.use((error, req, res, next) => {
  console.error("Error:", error.message)
  res.status(error.status || 500).json({
    error: "Error interno del servidor",
    message: error.message,
  })
})

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🌟 Servidor ejecutándose en http://localhost:${PORT}`)
  console.log(`📊 Ambiente: ${process.env.NODE_ENV || "development"}`)
})

module.exports = app
