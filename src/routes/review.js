const express = require("express");
const router = express.Router();
const {
  getAllReviews,
  getReviewsByGame,
  createReview,
  updateReview,
  deleteReview,
} = require("../controllers/review");

router.get("/", getAllReviews);
router.get("/juego/:juegoId", getReviewsByGame);
router.post("/", createReview);
router.put("/:id", updateReview);
router.delete("/:id", deleteReview);

module.exports = router;
