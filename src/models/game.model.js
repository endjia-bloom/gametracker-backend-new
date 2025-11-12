const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  titulo: { type: String, required: true, trim: true },
  genero: { type: String, required: true, trim: true },
  plataforma: { type: String, required: true, trim: true },
  añoLanzamiento: { type: Number, required: true },
  desarrollador: { type: String, required: true, trim: true },
}, { timestamps: true }); // crea createdAt y updatedAt

module.exports = mongoose.model('Game', gameSchema);
