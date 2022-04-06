import React, { useContext, useState } from "react";
import NoteContext from "../context/notes/NoteContext";

const AddNote = () => {
	const notes = useContext(NoteContext);
	const { addNote } = notes;
	const [note, setNote] = useState({
		title: "",
		description: "",
		tag: "",
	});
	const handleClick = (e) => {
		e.preventDefault();
		addNote(note.title, note.description, note.tag);
		setNote({ title: "", description: "", tag: "" });
	};
	const onChange = (e) => {
		setNote({ ...note, [e.target.name]: e.target.value });
	};
	return (
		<div className="container my-3">
			<h2>AddNote</h2>
			<form className="my-3">
				<div className="form-group mb-3">
					<label htmlFor="title">Title</label>
					<input
						type="text"
						className="form-control"
						id="title"
						name="title"
						aria-describedby="Help"
						placeholder="Enter Title"
						value={note.title}
						onChange={onChange}
					/>
					<small id="emailHelp" className="form-text text-muted">
						We'll never share your email with anyone else.
					</small>
				</div>
				<div className="form-group mb-3">
					<label htmlFor="description">Description</label>
					<input
						type="text"
						className="form-control"
						id="description"
						name="description"
						placeholder="Description"
						value={note.description}
						onChange={onChange}
					/>
				</div>
				<div className="form-group mb-3">
					<label htmlFor="tag">Tag</label>
					<input
						type="text"
						className="form-control"
						id="tag"
						name="tag"
						placeholder="tag"
						value={note.tag}
						onChange={onChange}
					/>
				</div>

				<button
					type="submit"
					className="btn btn-primary"
					disabled={
						note.title.length < 5 || note.description.length < 5 ? true : false
					}
					onClick={handleClick}
				>
					Add Note
				</button>
			</form>
		</div>
	);
};

export default AddNote;
