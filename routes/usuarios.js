const express = require("express")
const router = express.Router()
const Usuario = require("../models/Usuario")

// GET /api/usuarios - Obtener todos los usuarios
router.get("/", async (req, res) => {
  try {
    const usuarios = await Usuario.find({ activo: true }).select("-contraseña").sort({ fechaCreacion: -1 })

    res.json({
      success: true,
      count: usuarios.length,
      data: usuarios,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Error al obtener usuarios",
      message: error.message,
    })
  }
})

// GET /api/usuarios/:id - Obtener usuario por ID
router.get("/:id", async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id).select("-contraseña")

    if (!usuario) {
      return res.status(404).json({
        success: false,
        error: "Usuario no encontrado",
      })
    }

    res.json({
      success: true,
      data: usuario,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Error al obtener usuario",
      message: error.message,
    })
  }
})

// POST /api/usuarios - Crear nuevo usuario
router.post("/", async (req, res) => {
  try {
    const { nombre, correoElectronico, contraseña, rol } = req.body

    // Verificar si el usuario ya existe
    const usuarioExistente = await Usuario.findOne({ correoElectronico })
    if (usuarioExistente) {
      return res.status(400).json({
        success: false,
        error: "Ya existe un usuario con este correo electrónico",
      })
    }

    const nuevoUsuario = new Usuario({
      nombre,
      correoElectronico,
      contraseña,
      rol,
    })

    const usuarioGuardado = await nuevoUsuario.save()

    res.status(201).json({
      success: true,
      message: "Usuario creado exitosamente",
      data: usuarioGuardado,
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      error: "Error al crear usuario",
      message: error.message,
    })
  }
})

// PUT /api/usuarios/:id - Actualizar usuario
router.put("/:id", async (req, res) => {
  try {
    const { nombre, correoElectronico, rol } = req.body

    const usuarioActualizado = await Usuario.findByIdAndUpdate(
      req.params.id,
      { nombre, correoElectronico, rol },
      { new: true, runValidators: true },
    ).select("-contraseña")

    if (!usuarioActualizado) {
      return res.status(404).json({
        success: false,
        error: "Usuario no encontrado",
      })
    }

    res.json({
      success: true,
      message: "Usuario actualizado exitosamente",
      data: usuarioActualizado,
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      error: "Error al actualizar usuario",
      message: error.message,
    })
  }
})

// DELETE /api/usuarios/:id - Eliminar usuario (soft delete)
router.delete("/:id", async (req, res) => {
  try {
    const usuario = await Usuario.findByIdAndUpdate(req.params.id, { activo: false }, { new: true })

    if (!usuario) {
      return res.status(404).json({
        success: false,
        error: "Usuario no encontrado",
      })
    }

    res.json({
      success: true,
      message: "Usuario eliminado exitosamente",
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Error al eliminar usuario",
      message: error.message,
    })
  }
})

module.exports = router
