const Game = require("../models/game");

exports.getAllGames = async (req, res) => {
  try {
    const games = await Game.find().sort({ createdAt: -1 });
    res.json(games);
  } catch (err) {
    res.status(500).json({ message: "Error al obtener juegos" });
  }
};

exports.getGameById = async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    if (!game) return res.status(404).json({ message: "Juego no encontrado" });
    res.json(game);
  } catch (err) {
    res.status(500).json({ message: "Error al obtener juego" });
  }
};

exports.createGame = async (req, res) => {
  try {
    const game = new Game(req.body);
    const saved = await game.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: "Error al crear juego" });
  }
};

exports.updateGame = async (req, res) => {
  try {
    const updated = await Game.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ message: "Juego no encontrado" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Error al actualizar juego" });
  }
};

exports.deleteGame = async (req, res) => {
  try {
    const deleted = await Game.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Juego no encontrado" });
    res.json({ message: "Juego eliminado correctamente" });
  } catch (err) {
    res.status(500).json({ message: "Error al eliminar juego" });
  }
};
