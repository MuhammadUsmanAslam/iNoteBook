const express = require("express");
const router = express.Router();
const Note = require("../models/note");
const fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");

// Getting all the notes using GET on rooute localhost:5000/api/notes/getallnotes
router.get("/getallnotes", fetchuser, async (req, res) => {
	try {
		const notes = await Note.find({ user: req.user.id });
		console.log(notes);
		res.json(notes);
	} catch (err) {
		res.status(500).json({ error: "internal server error" });
	}
});

// adding a notes using POST on rooute localhost:5000/api/notes/addnote
router.post(
	"/addnote",
	fetchuser,
	[
		body("title", "title is not valid").isLength({ min: 3 }),
		body("description", "description is not valid").isLength({ min: 5 }),
	],
	async (req, res) => {
		try {
			const { title, description, tag } = req.body;
			// If there are errors, return the bad requests and errors
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(400).json({ errors: errors.array() });
			}
			const note = new Note({ title, description, tag, user: req.user.id });
			const savednote = await note.save();
			res.send(savednote);
		} catch (err) {
			res.status(500).json({ error: "internal server error" });
		}
	}
);

module.exports = router;
