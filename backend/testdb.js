const mongoose = require("mongoose");
console.log('connecting');
mongoose
	.connect(`mongodb+srv://cluster0.8wvuy.mongodb.net/beans-appts`, {
		user: 'Nicole',
		pass: '8fI25mj225wmmngG',
		useNewUrlParser: true,
		useUnifiedTopology: true,
        'w': 'majority',
        'retryWrites': true,
		authSource: "admin",
	})
	.then(() => console.log("MongoDB connected..."))
	.catch((err) => console.log(err));