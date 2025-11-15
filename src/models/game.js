const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema(
  {
    titulo: { type: String, required: true },
    genero: { type: String, required: true },
    plataforma: { type: String, required: true },
    añoLanzamiento: { type: Number, required: true },
    desarrollador: { type: String, required: true },
    descripcion: { type: String, default: "" },
    estado: {
      type: String,
      enum: ["pendiente", "jugando", "completado"],
      default: "pendiente",
    },
    horasJugadas: { type: Number, default: 0 },
    imagenPortada: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Game", gameSchema);
