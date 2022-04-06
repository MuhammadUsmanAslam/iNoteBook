const connectToMongo = require("./db");
const express = require("express");
let cors = require("cors");

connectToMongo();

const app = express();

app.use(cors());

const port = 5000;

// app.get("/", (req, res) => {
// 	res.send("Hello Usman!");
// });
app.use(express.json());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
