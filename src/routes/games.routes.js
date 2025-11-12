const express = require('express');
const router = express.Router();

const {
  getAllGames,
  getGameById,
  createGame,
  updateGame,
  deleteGame
} = require('../controllers/game.controller');

router.get('/', getAllGames);       // GET /api/juegos
router.get('/:id', getGameById);    // GET /api/juegos/:id
router.post('/', createGame);       // POST /api/juegos
router.put('/:id', updateGame);     // PUT /api/juegos/:id
router.delete('/:id', deleteGame);  // DELETE /api/juegos/:id

module.exports = router;
