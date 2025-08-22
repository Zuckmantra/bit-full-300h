const mongoose = require("mongoose")

// Esquema para Comentarios
const comentarioSchema = new mongoose.Schema(
  {
    contenido: {
      type: String,
      required: [true, "El contenido del comentario es obligatorio"],
      trim: true,
      minlength: [1, "El comentario no puede estar vacío"],
      maxlength: [500, "El comentario no puede exceder 500 caracteres"],
    },
    autor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
      required: [true, "El autor es obligatorio"],
    },
    publicacion: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Publicacion",
      required: [true, "La publicación es obligatoria"],
    },
    fechaComentario: {
      type: Date,
      default: Date.now,
    },
    aprobado: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
)

// Índices
comentarioSchema.index({ publicacion: 1 })
comentarioSchema.index({ autor: 1 })

module.exports = mongoose.model("Comentario", comentarioSchema)
