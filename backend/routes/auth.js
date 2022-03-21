const express = require("express");
const User = require("../models/user");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "usmanisgoodguy";

// create user path /api/auth
router.post(
	"/createuser",
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
		try {
			let user = await User.findOne({ email: req.body.email });
			if (user) {
				return res
					.status(400)
					.json({ error: "Sorry a User with the same email already exists" });
			}
			const salt = await bcrypt.genSalt(10);
			const secPass = await bcrypt.hash(req.body.password, salt);

			user = await User.create({
				name: req.body.name,
				email: req.body.email,
				password: secPass,
			});
			const data = {
				user: {
					id: user.id,
				},
			};
			const authToken = jwt.sign(data, JWT_SECRET);
			res.json({ authtoken: authToken });
			// console.log(authToken);
			// res.status(201).json(user);
		} catch (error) {
			console.log(`error during ex: ${error.message}`);
		}
	}
);

module.exports = router;
