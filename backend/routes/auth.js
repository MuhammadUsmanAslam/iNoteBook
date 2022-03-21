const express = require("express");
const User = require("../models/user");
const router = express.Router();
const { body, validationResult } = require("express-validator");

// create user path /api/auth
router.post(
	"/",
	[
		body("name", "name is not valid").isLength({ min: 3 }),
		body("email", "email is not valid").isEmail(),
		body("password", "password is not valid").isLength({ min: 5 }),
	],
	async (req, res) => {
		// If there are errors, return the bad requests and errors
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		// Check wether the use with the same email already exists
		// let user = User.findOne({ email: req.body.email });
		// if (user) {
		// 	return res
		// 		.status(400)
		// 		.json({ error: "Sorry a User with the same email already exists" });
		// }
		// user = await
		User.create({
			name: req.body.name,
			email: req.body.email,
			password: req.body.password,
		})
			.then((user) => res.json({ user, msg: "Hello G " }))
			.catch((err) => {
				res.json({ error: "plz enter a unique email", msg: err.message });
				console.log(`Error Accoured: ${err}`);
			});
	}
);

module.exports = router;
