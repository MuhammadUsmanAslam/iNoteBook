import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const Signup = ({ showAlert }) => {
	const history = useHistory();
	const [signup, setSignup] = useState({ name: "", email: "", password: "" });

	const onChange = (e) => {
		setSignup({ ...signup, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		let response = await fetch(`http://localhost:5000/api/auth/signup`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				name: signup.name,
				email: signup.email,
				password: signup.password,
			}),
		});
		let responseData = await response.json();
		console.log(responseData);
		if (responseData.success === true) {
			localStorage.setItem("auth-token", responseData.authToken);
			history.push("/");
			showAlert("Sigup Success", "success");
		} else {
			showAlert(responseData.error, "danger");
		}
	};
	return (
		<form className="container" onSubmit={handleSubmit}>
			<div className="form-group">
				<label htmlFor="name">Name</label>
				<input
					type="text"
					className="form-control my-2"
					id="name"
					name="name"
					aria-describedby="emailHelp"
					placeholder="Enter name"
					value={signup.name}
					onChange={onChange}
				/>
				<label htmlFor="email">Email address</label>
				<input
					type="email"
					className="form-control my-2"
					id="email"
					name="email"
					aria-describedby="emailHelp"
					placeholder="Enter email"
					value={signup.email}
					onChange={onChange}
				/>
				<small id="emailHelp" className="form-text text-muted">
					We'll never share your email with anyone else.
				</small>
			</div>
			<div className="form-group">
				<label htmlFor="password">Password</label>
				<input
					type="password"
					className="form-control my-2"
					id="password"
					name="password"
					placeholder="Password"
					value={signup.password}
					onChange={onChange}
				/>
			</div>

			<button type="submit" className="btn btn-primary my-2">
				SignUp
			</button>
		</form>
	);
};

export default Signup;
