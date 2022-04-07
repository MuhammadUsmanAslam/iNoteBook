import React, { useEffect } from "react";

const Alert = ({ alert }) => {
	useEffect(() => {
		//   first

		return () => {
			// second
		};
	}, [alert.msg, alert.type]);

	return (
		<div className={`alert alert-${alert.type}`} role="alert">
			{alert.msg}
		</div>
	);
};

export default Alert;
