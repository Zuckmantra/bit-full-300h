const mongoose = require("mongoose")

// Esquema del Usuario
const usuarioSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, "El nombre es obligatorio"],
      trim: true,
      minlength: [2, "El nombre debe tener al menos 2 caracteres"],
      maxlength: [50, "El nombre no puede exceder 50 caracteres"],
    },
    correoElectronico: {
      type: String,
      required: [true, "El correo electrónico es obligatorio"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Por favor ingresa un correo electrónico válido"],
    },
    contraseña: {
      type: String,
      required: [true, "La contraseña es obligatoria"],
      minlength: [6, "La contraseña debe tener al menos 6 caracteres"],
    },
    rol: {
      type: String,
      enum: {
        values: ["admin", "usuario"],
        message: "El rol debe ser admin o usuario",
      },
      default: "usuario",
    },
    fechaCreacion: {
      type: Date,
      default: Date.now,
    },
    activo: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true, // Agrega createdAt y updatedAt automáticamente
    versionKey: false, // Elimina el campo __v
  },
)

// Índices para optimizar consultas
usuarioSchema.index({ correoElectronico: 1 })
usuarioSchema.index({ rol: 1 })

// Método para ocultar la contraseña en las respuestas JSON
usuarioSchema.methods.toJSON = function () {
  const usuario = this.toObject()
  delete usuario.contraseña
  return usuario
}

// Middleware pre-save para validaciones adicionales
usuarioSchema.pre("save", function (next) {
  // Capitalizar el nombre
  if (this.nombre) {
    this.nombre = this.nombre.charAt(0).toUpperCase() + this.nombre.slice(1).toLowerCase()
  }
  next()
})

module.exports = mongoose.model("Usuario", usuarioSchema)
