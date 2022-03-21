const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
	// res.json([]);
	res.json({ name: "Usman notes" });
});

module.exports = router;
