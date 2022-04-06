import React, { useContext } from "react";
import NoteContext from "../context/notes/NoteContext";

const NoteItem = ({ note, updateNote }) => {
	const notes = useContext(NoteContext);
	const { deleteNote } = notes;
	return (
		<div className="card col-md-3 m-3">
			{/* <div className="card col-md-3 m-3"> */}
			<div className="card-body">
				<h5 className="card-title">{note.title}</h5>
				<i
					className="fa-solid fa-trash mx-3"
					onClick={() => {
						deleteNote(note._id);
					}}
				></i>
				<i
					className="fa-solid fa-pen-to-square mx-3"
					onClick={() => {
						updateNote(note);
					}}
				></i>
				<p className="card-text">{note.description}</p>
			</div>
		</div>
	);
};

export default NoteItem;
