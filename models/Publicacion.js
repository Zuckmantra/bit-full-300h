const mongoose = require("mongoose")

// Esquema para Publicaciones (para proyectos tipo blog)
const publicacionSchema = new mongoose.Schema(
  {
    titulo: {
      type: String,
      required: [true, "El título es obligatorio"],
      trim: true,
      maxlength: [100, "El título no puede exceder 100 caracteres"],
    },
    contenido: {
      type: String,
      required: [true, "El contenido es obligatorio"],
      minlength: [10, "El contenido debe tener al menos 10 caracteres"],
    },
    autor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
      required: [true, "El autor es obligatorio"],
    },
    categoria: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Categoria",
      required: [true, "La categoría es obligatoria"],
    },
    fechaPublicacion: {
      type: Date,
      default: Date.now,
    },
    estado: {
      type: String,
      enum: {
        values: ["borrador", "publicado", "archivado"],
        message: "El estado debe ser borrador, publicado o archivado",
      },
      default: "borrador",
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    imagen: {
      type: String,
      default: null,
    },
    vistas: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
)

// Índices
publicacionSchema.index({ titulo: "text", contenido: "text" })
publicacionSchema.index({ autor: 1 })
publicacionSchema.index({ categoria: 1 })
publicacionSchema.index({ estado: 1 })

module.exports = mongoose.model("Publicacion", publicacionSchema)
