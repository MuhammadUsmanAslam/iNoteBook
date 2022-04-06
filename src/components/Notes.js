import React, { useState, useContext, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import NoteContext from "../context/notes/NoteContext";
import AddNote from "./AddNote";
import NoteItem from "./NoteItem";

const Notes = () => {
	const { getNotes, editNote, notes } = useContext(NoteContext);

	let history = useHistory();

	useEffect(() => {
		if (localStorage.getItem("auth-token")) {
			getNotes();
		} else {
			history.push("/login");
		}
	}, []);

	// Edit Notes Starts
	const ref = useRef(null);
	const uref = useRef(null);

	const [newNote, setNewNote] = useState({
		eid: "",
		etitle: "",
		edescription: "",
		etag: "",
	});

	const updateNote = (currentNote) => {
		ref.current.click();

		setNewNote({
			eid: currentNote._id,
			etitle: currentNote.title,
			edescription: currentNote.description,
			etag: currentNote.tag,
		});
	};

	const handleClick = (e) => {
		uref.current.click();
		editNote(newNote.eid, newNote.etitle, newNote.edescription, newNote.etag);
	};
	const onChange = (e) => {
		setNewNote({ ...newNote, [e.target.name]: e.target.value });
	};
	// Edit Notes Ends

	return (
		<>
			<AddNote />
			{/* <!-- Button trigger modal --> */}
			<button
				ref={ref}
				type="button"
				className="btn btn-primary d-none"
				data-toggle="modal"
				data-target="#exampleModal"
			>
				Launch demo modal
			</button>

			{/* <!-- Modal --> */}
			<div
				className="modal fade"
				id="exampleModal"
				tabIndex="-1"
				role="dialog"
				aria-labelledby="exampleModalLabel"
				aria-hidden="true"
			>
				<div className="modal-dialog" role="document">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="exampleModalLabel">
								Edit Note
							</h5>
							<button
								type="button"
								className="close"
								data-dismiss="modal"
								aria-label="Close"
							>
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div className="modal-body">
							{/* form */}
							<form className="my-3">
								<div className="form-group mb-3">
									<label htmlFor="etitle">Title</label>
									<input
										type="text"
										className="form-control"
										id="etitle"
										name="etitle"
										aria-describedby="Help"
										placeholder="Enter Title"
										value={newNote.etitle}
										onChange={onChange}
									/>
									<small id="emailHelp" className="form-text text-muted">
										We'll never share your email with anyone else.
									</small>
								</div>
								<div className="form-group mb-3">
									<label htmlFor="edescription">Description</label>
									<input
										type="text"
										className="form-control"
										id="edescription"
										name="edescription"
										placeholder="Description"
										value={newNote.edescription}
										onChange={onChange}
									/>
								</div>
								<div className="form-group mb-3">
									<label htmlFor="etag">Tag</label>
									<input
										type="text"
										className="form-control"
										id="etag"
										name="etag"
										placeholder="tag"
										value={newNote.etag}
										onChange={onChange}
									/>
								</div>
							</form>
							{/* form */}
						</div>
						<div className="modal-footer">
							<button
								type="button"
								className="btn btn-secondary"
								data-dismiss="modal"
								ref={uref}
							>
								Close
							</button>
							<button
								onClick={handleClick}
								type="button"
								className="btn btn-primary"
							>
								Update Note
							</button>
						</div>
					</div>
				</div>
			</div>
			{/* Edit Note */}

			<div className="row my-3">
				<h1>Your Notes</h1>
				{notes.length == 0 && <h6>No Notes To Display</h6>}

				{notes.map((note) => {
					return (
						<NoteItem key={note._id} note={note} updateNote={updateNote} />
					);
				})}
			</div>
		</>
	);
};

export default Notes;
