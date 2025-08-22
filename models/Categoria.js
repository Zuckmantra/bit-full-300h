const mongoose = require("mongoose")

// Esquema para Categorías
const categoriaSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, "El nombre de la categoría es obligatorio"],
      unique: true,
      trim: true,
      maxlength: [30, "El nombre no puede exceder 30 caracteres"],
    },
    descripcion: {
      type: String,
      trim: true,
      maxlength: [200, "La descripción no puede exceder 200 caracteres"],
    },
    color: {
      type: String,
      default: "#3B82F6",
      match: [/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Debe ser un color hexadecimal válido"],
    },
    activa: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
)

module.exports = mongoose.model("Categoria", categoriaSchema)
