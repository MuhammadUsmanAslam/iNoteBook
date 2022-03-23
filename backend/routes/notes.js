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

// updating a notes using PUT on route localhost:5000/api/notes/apdatenote
router.put("/updatenote/:id", fetchuser, async (req, res) => {
	try {
		const { title, description, tag } = req.body;
		const newnote = {};
		if (title) {
			newnote.title = title;
		}
		if (description) {
			newnote.description = description;
		}
		if (tag) {
			newnote.tag = tag;
		}

		let note = await Note.findById(req.params.id);
		if (!note) {
			return res.status(401).send("not allowed");
		}

		if (note.user.toString() !== req.user.id) {
			return res.status(401).send("not allowed");
		}

		note = await Note.findByIdAndUpdate(
			req.params.id,
			{ $set: newnote },
			{ new: true }
		);

		// res.send("not tried 1");
		res.send(note);
	} catch (err) {
		res.status(500).json({ error: "internal server error 1" });
	}
});

module.exports = router;
