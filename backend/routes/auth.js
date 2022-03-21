const express = require("express");
const User = require("../models/user");
const router = express.Router();

// create user path /api/auth
router.post("/", (req, res) => {
	const user = User(req.body);
	user.save();
	res.send(req.body);
	// res.json({ name: "Usman auth" });
});

module.exports = router;
