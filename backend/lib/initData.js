const mongoose = require("mongoose");
const Speciality = require("../models/Speciality");
const Therapist = require("../models/Therapist");

let allSpecialitiesData = require("./allSpecialities.json");
let testTherapistsData = require("../test/data/therapists.json");
let testAppointmentSlotsData = require("../test/data/appointmentSlots.json");
const AppointmentSlot = require("../models/AppointmentSlot");


// Connect to DB
const realDBConnect = () => {
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
};

const testDBConnect = async () => {
	try {
		const c = await mongoose.connect(
			`${process.env.MONGODB_URL}/beans-appts-test`,
			{
				user: process.env.MONGO_USER,
				pass: process.env.MONGO_PASSWORD,
				useNewUrlParser: true,
				useUnifiedTopology: true,
				authSource: "admin",
			}
		);
		console.log(`MongoDB connected to test ${c.connectionString}`);
	} catch (error) {
		console.error(error);
	}
};

const seedSpecialities = async () => {
	for (let i in allSpecialitiesData) {
		const speciality = allSpecialitiesData[i];
		const exists = await Speciality.find({ name: speciality.name }).exec();
		if (exists.length) {
			//console.log("exists");
			continue;
		}
		const inputSpeciality = { name: speciality.name };
		if (speciality.parent) {
			// lookup parentId
			const parentObj = await Speciality.findOne({
				name: speciality.parent,
			}).exec();
			//console.log("parent");
			//console.log(parentObj);
			inputSpeciality.parent = parentObj._id;
		}
		const newSpeciality = new Speciality(inputSpeciality);
		await newSpeciality.save();
	}
	const allSpecialities = await Speciality.find();
	//console.log(allSpecialities);
	return allSpecialities;
};

const seedTestTherapists = async () => {
	for (let i in testTherapistsData) {
		const therapistRaw = testTherapistsData[i];
		let specialitiesIds = await Speciality.find(
			{
				name: { $in: therapistRaw.specialities },
			},
			"_id"
		);
		const therapist = {
			name: therapistRaw.therapistName,
			specialities: specialitiesIds,
		};
		const newTherapist = new Therapist(therapist);
		await newTherapist.save();
	}
};

const seedAppointmentData = async () => {
	for (let i in testAppointmentSlotsData) {
		const testAppointmentSlot = testAppointmentSlotsData[i];
		const therapist = await Therapist.findOne({
			name: testAppointmentSlot.therapistName,
		}).exec();
		const therapistId = therapist._id;
		const appointmentSlot = {
			timeStart: testAppointmentSlot.timeStart,
			timeEnd: testAppointmentSlot.timeEnd,
			therapist: therapistId,
		};
		const newAppointmentSlot = new AppointmentSlot(appointmentSlot);
		await newAppointmentSlot.save();
	}
};



exports.seedSpecialities = seedSpecialities;
exports.testDBConnect = testDBConnect;
exports.seedTestTherapists = seedTestTherapists;
exports.seedAppointmentData = seedAppointmentData;