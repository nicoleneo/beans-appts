const mongoose = require("mongoose");
const Speciality = require("./models/Speciality");
let allSpecialitiesData = require("./lib/allSpecialities.json");

console.log("connecting");
mongoose
	.connect(`mongodb+srv://cluster0.8wvuy.mongodb.net/beans-appts`, {
		user: "Nicole",
		pass: "8fI25mj225wmmngG",
		useNewUrlParser: true,
		useUnifiedTopology: true,
		w: "majority",
		retryWrites: true,
		authSource: "admin",
	})
	.then(() => console.log("MongoDB connected..."))
	.catch((err) => console.log(err));

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

seedSpecialities();