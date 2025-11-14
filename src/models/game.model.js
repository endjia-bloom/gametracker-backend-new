const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  titulo: { 
    type: String, 
    required: true, 
    trim: true 
  },

  genero: { 
    type: String, 
    required: true, 
    trim: true 
  },

  plataforma: { 
    type: String, 
    required: true, 
    trim: true 
  },

  añoLanzamiento: { 
    type: Number, 
    required: true 
  },

  desarrollador: { 
    type: String, 
    required: true, 
    trim: true 
  },

  // ⭐ NUEVOS CAMPOS (CON REQUISITOS DEL PROYECTO)
  estado: {
    type: String,
    enum: ["pendiente", "jugando", "completado"],
    default: "pendiente"
  },

  horasJugadas: {
    type: Number,
    default: 0
  },

  imagen: {
    type: String,
    default: ""
  }

}, { timestamps: true }); // crea createdAt y updatedAt automáticamente

module.exports = mongoose.model('Game', gameSchema);
