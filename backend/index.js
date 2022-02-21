const express = require("express");
const path = require("path");
const { graphqlHTTP } = require("express-graphql");
const cors = require("cors");
const history = require("connect-history-api-fallback");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 3000;
const { schema } = require("./lib/graphQL");
const { root } = require("./lib/root");

const frontendStaticFile = path.join(__dirname, "frontend", "index.html");

app.get("/", (req, res) => {
	let instructions = `Frontend /frontend <br />`;
	instructions += "GraphQL: /graphql <br />";
	res.send(instructions);
});
// Connect to DB
mongoose
	.connect(`${process.env.MONGODB_URL}/beans-appts`, {
		user: process.env.MONGO_USER,
		pass: process.env.MONGO_PASSWORD,
		useNewUrlParser: true,
		useUnifiedTopology: true,
		authSource: "admin",
	})
	.then(() => console.log("MongoDB connected..."))
	.catch((err) => console.log(err));

app.use(cors());
app.use(
	"/graphql",
	graphqlHTTP({
		schema: schema,
		rootValue: root,
		graphiql: true,
	})
);


app.use("/frontend", express.static(path.join(__dirname, "frontend")));
app.get("/frontend", (req, res) => {
	res.sendFile(frontendStaticFile);
});
app.get("/frontend/therapists", (req, res) => {
	res.sendFile(frontendStaticFile);
});
app.get("/frontend/therapist-appointments", (req, res) => {
	res.sendFile(frontendStaticFile);
});
app.use(
	history({
		index: frontendStaticFile,
		disableDotRule: true,
		verbose: true,
	})
);

app.listen(port, () => console.log(`GraphQL server running on port ${port}!`));
