const express = require("express");
const MeditationController = require("../controllers/MeditationController");

const router = express.Router(); // Use 'const' here

router.get("/dailyQuotes", MeditationController.dailyQuote);
router.get("/myMood/:mood", MeditationController.myMood);

module.exports = router; // Ensure correct export
