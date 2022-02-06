const methods = require("../methods");
const AppointmentSlot = require("../models/AppointmentSlot");
const Speciality = require("../models/Speciality");
const Therapist = require("../models/Therapist");

const root = {
	allTherapists: async () => {
		console.log("all therapists");
		const therapists = await Therapist.find().populate("specialities");
		return therapists;
	},
	allSpecialities: async () => {
		console.log("all specialities");
		const specialities = await Speciality.find().populate("parent");
		return specialities;
	},
	createTherapist: async (args) => {
		const {
			therapist: { name, specialities },
		} = args;
		console.log(args);
		const newTherapist = new Therapist({ name, specialities });
		await newTherapist.save();
		return newTherapist;
	},
	searchAppointmentSlots: async (args) => {
		const {
			criteria: { startDate, endDate, specialities },
		} = args;
		console.log(args);
		const therapistIds = await Therapist.find({
			specialities: { $in: specialities },
		}, '_id');
		const appointmentSlots = await AppointmentSlot.find({
			therapist: { $in: therapistIds },
		});
		return appointmentSlots;
	},
};

exports.root = root;
