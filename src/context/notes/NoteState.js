import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
	let BASE_URL = "http://localhost:5000";
	const [notes, setNotes] = useState([]);

	// Get all notes for a specific user using JSON web token

	const getNotes = async () => {
		let authToken = localStorage.getItem("auth-token");
		let response = await fetch(`${BASE_URL}/api/notes/getallnotes`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				"auth-token": authToken,
			},
		});
		let responseDat = await response.json();

		setNotes(responseDat);
	};

	// Adding a new note
	const addNote = async (title, description, tag) => {
		let authToken = localStorage.getItem("auth-token");
		let response = await fetch(`${BASE_URL}/api/notes/addnote`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"auth-token": authToken,
			},
			body: JSON.stringify({
				title: title,
				description: description,
				tag: tag,
			}),
		});
		let responseData = await response.json();

		setNotes([...notes, responseData]);
	};

	// Deleting a Note with Click
	const deleteNote = async (id) => {
		let authToken = localStorage.getItem("auth-token");
		let response = await fetch(`${BASE_URL}/api/notes/deletenote/${id}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				"auth-token": authToken,
			},
		});
		let responseData = await response.json();

		setNotes(
			notes.filter((note) => {
				return note._id !== id;
			})
		);
	};
	const editNote = async (id, title, description, tag) => {
		let authToken = localStorage.getItem("auth-token");
		// These lines Updates/Edits note from backend -- Starts Here
		let response = await fetch(`${BASE_URL}/api/notes/updatenote/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				"auth-token": authToken,
			},
			body: JSON.stringify({ title, description, tag }),
		});
		let responseData = await response.json();

		// These lines Updates/Edits note from backend -- Ends Here

		// This line creates a deep copy of array
		const newNotes = JSON.parse(JSON.stringify(notes));

		for (let index = 0; index < newNotes.length; index++) {
			const element = newNotes[index];
			if (element._id === id) {
				newNotes[index].title = title;
				newNotes[index].description = description;
				newNotes[index].tag = tag;
				break;
			}
		}
		setNotes(newNotes);
	};
	return (
		<NoteContext.Provider
			value={{ notes, addNote, getNotes, editNote, deleteNote }}
		>
			{props.children}
		</NoteContext.Provider>
	);
};

export default NoteState;
