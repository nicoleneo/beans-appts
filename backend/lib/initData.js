const mongoose = require("mongoose");
const Speciality = require("../models/Speciality");

let allSpecialitiesData = require("./allSpecialities.json");

// Connect to DB
const realDBConnect = () => {
	mongoose
	.connect(`${process.env.MONGODB_URL}/beans-appts`, {
		user: process.env.MONGO_USER,
		pass: process.env.MONGO_PASSWORD,
		useNewUrlParser: true,
		useUnifiedTopology: true,
        authSource: 'admin',
	})
	.then(() => console.log("MongoDB connected..."))
	.catch((err) => console.log(err));
};

const testDBConnect = () => {
	mongoose
	.connect(`${process.env.MONGODB_URL}/beans-appts-test`, {
		user: process.env.MONGO_USER,
		pass: process.env.MONGO_PASSWORD,
		useNewUrlParser: true,
		useUnifiedTopology: true,
        authSource: 'admin',
	})
	.then(() => console.log("MongoDB connected to test..."))
	.catch((err) => console.log(err));
};


const seedSpecialities = async () => {
	for (let i in allSpecialitiesData) {
		const speciality = allSpecialitiesData[i];
		const exists = await Speciality.find({ name: speciality.name }).exec();
		if (exists.length) {
			console.log("exists");
			continue;
		}
		const inputSpeciality = { name: speciality.name };
		if (speciality.parent) {
			// lookup parentId
			const parentObj = await Speciality.findOne({
				name: speciality.parent,
			}).exec();
            console.log("parent");
			console.log(parentObj);
			inputSpeciality.parent = parentObj._id;
		}
		const newSpeciality = new Speciality(inputSpeciality);
		await newSpeciality.save();
	}
	const allSpecialities = await Speciality.find();
	console.log(allSpecialities);
	return allSpecialities;
};


exports.seedSpecialities = seedSpecialities;
exports.testDBConnect = testDBConnect;

