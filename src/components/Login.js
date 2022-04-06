import React, { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Login = () => {
	const history = useHistory();
	const [login, setLogin] = useState({ email: "", password: "" });

	const onChange = (e) => {
		setLogin({ ...login, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		let response = await fetch(`http://localhost:5000/api/auth/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email: login.email,
				password: login.password,
			}),
		});
		let responseData = await response.json();
		if (responseData.success === true) {
			localStorage.setItem("auth-token", responseData.authtoken);
			console.log(responseData.authtoken);

			history.push("/");
		}
	};
	return (
		<form className="container" onSubmit={handleSubmit}>
			<div className="form-group">
				<label htmlFor="email">Email address</label>
				<input
					type="email"
					className="form-control my-2"
					id="email"
					name="email"
					aria-describedby="emailHelp"
					placeholder="Enter email"
					value={login.email}
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
					value={login.password}
					onChange={onChange}
				/>
			</div>

			<button type="submit" className="btn btn-primary my-2">
				Login
			</button>
		</form>
	);
};

export default Login;
