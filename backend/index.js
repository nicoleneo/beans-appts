const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 3000;
const { schema } = require("./lib/graphQL");
const { root } = require("./lib/root");

// Connect to DB
mongoose
	.connect(`${process.env.MONGODB_URL}/beans-appts`)
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

app.listen(port, () => console.log(`GraphQL server running on port ${port}!`));
