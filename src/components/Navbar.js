import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useHistory, useLocation } from "react-router-dom";

function Navbar({ showAlert }) {
	const location = useLocation();
	const history = useHistory();
	let token = localStorage.getItem("auth-token");
	useEffect(() => {}, [token]);
	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-light">
			<div className="container-fluid">
				<Link className="navbar-brand" to="/">
					Navbar
				</Link>
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarNav"
					aria-controls="navbarNav"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarNav">
					<ul className="navbar-nav">
						<li className="nav-item">
							<Link
								className={`nav-link ${
									location.pathname === "/" ? "active" : ""
								}`}
								to="/"
							>
								Home
							</Link>
						</li>
						<li className="nav-item">
							<Link
								className={`nav-link ${
									location.pathname === "/about" ? "active" : ""
								}`}
								to="/about"
							>
								About
							</Link>
						</li>
					</ul>
				</div>
			</div>

			{token ? (
				<button
					className="btn btn-primary mx-2"
					onClick={() => {
						localStorage.clear();
						history.push("/login");
						showAlert("Logout Success", "success");
					}}
				>
					Logout
				</button>
			) : (
				<form className="d-flex">
					<Link className="btn btn-primary mx-2" to="/login" role="button">
						Login
					</Link>
					<Link className="btn btn-primary mx-2" to="/signup" role="button">
						SignUp
					</Link>
				</form>
			)}
		</nav>
	);
}

export default Navbar;
