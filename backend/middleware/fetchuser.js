const jwt = require("jsonwebtoken");

const fetchuser = async (req, res, next) => {
	const JWT_SECRET = "usmanisgoodguy";
	const token = req.header("auth-token");
	if (!token) {
		res.status(401).send({ error: "Plz use a valid token" });
	}
	try {
		const data = await jwt.verify(token, JWT_SECRET);
		req.user = data.user;
		next();
	} catch (error) {
		res.status(401).send({ error: "Plz use a valid token" });
	}
};

module.exports = fetchuser;
