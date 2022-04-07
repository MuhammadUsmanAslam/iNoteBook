import About from "./components/About";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NoteState from "./context/notes/NoteState";
import Alert from "./components/Alert";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { useState } from "react";

function App() {
	const [alert, setAlert] = useState(null);
	const showAlert = (msg, type) => {
		setAlert({ msg: msg, type: type });
		setTimeout(() => {
			setAlert(null);
		}, 7500);
	};
	return (
		<div className="app">
			<NoteState>
				<Router>
					<Navbar showAlert={showAlert} />
					{alert && <Alert alert={alert} />}
					<Switch>
						<Route exact path="/">
							<Home />
						</Route>
						<Route exact path="/about">
							<About />
						</Route>
						<Route exact path="/login">
							<Login showAlert={showAlert} />
						</Route>
						<Route exact path="/signup">
							<Signup showAlert={showAlert} />
						</Route>
					</Switch>
				</Router>
			</NoteState>
		</div>
	);
}

export default App;
