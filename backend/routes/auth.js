const express = require("express");
const User = require("../models/user");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");

const JWT_SECRET = "usmanisgoodguy";

//Route:1 create a user using POST method with path: /api/auth/createuser
router.post(
	"/signup",
	[
		body("name", "name is not valid").isLength({ min: 3 }),
		body("email", "email is not valid").isEmail(),
		body("password", "password is not valid").isLength({ min: 5 }),
	],
	async (req, res) => {
		// If there are errors, return the bad requests and errors
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ success: false, errors: errors.array() });
		}
		// Check wether the use with the same email already exists
		try {
			let user = await User.findOne({ email: req.body.email });
			if (user) {
				return res.status(400).json({
					success: false,
					error: "Sorry a User with the same email already exists",
				});
			}
			const salt = await bcrypt.genSalt(10);
			const secPass = await bcrypt.hash(req.body.password, salt);

			user = await User.create({
				name: req.body.name,
				email: req.body.email,
				password: secPass,
			});
			const data = { user: { id: user.id } };
			const authToken = jwt.sign(data, JWT_SECRET);

			// console.log(authToken);
			res.status(201).json({ success: true, authToken });
		} catch (error) {
			console.log(`error during ex: ${error.message}`);
		}
	}
);

//Route:2 Authenticate a user using POST method with path: /api/auth/login
router.post(
	"/login",
	[
		body("email", "email is not valid").isEmail(),
		body("password", "password cannot be blanked").exists(),
	],
	async (req, res) => {
		// If there are errors, return the bad requests and errors
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ success: false, errors: errors.array() });
		}
		const { email, password } = req.body;
		try {
			let user = await User.findOne({ email });
			if (!user) {
				return res
					.status(401)
					.json({ success: false, error: "plz provide correct redentials" });
			}
			const passwordCompare = await bcrypt.compare(password, user.password);
			if (!passwordCompare) {
				return res
					.status(401)
					.json({ success: false, error: "plz provide correct redentials" });
			}
			const data = { user: { id: user.id } };
			const authToken = jwt.sign(data, JWT_SECRET);
			res.status(200).json({ success: true, authtoken: authToken });
		} catch (err) {
			res.status(500).json({ success: false, error: "internal server error" });
		}
	}
);

//Route:3 Getting Logged In user details using POST: /api/auth/getuser  JWT
router.post("/getuser", fetchuser, async (req, res) => {
	try {
		const userId = req.user.id;
		const user = await User.findById(userId).select("-password");
		res.send(user);
	} catch (error) {
		res.status(500).send("Internal server error");
	}
});

module.exports = router;
