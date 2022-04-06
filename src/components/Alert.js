import React from "react";

const Alert = ({ msg, type }) => {
	return (
		<div className="alert alert-primary" role="alert">
			{msg}
		</div>
	);
};

export default Alert;
