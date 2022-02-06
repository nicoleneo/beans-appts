const methods = require("../methods");
const Speciality = require("../models/Speciality");
const Therapist = require("../models/Therapist");

const root = {
	allTherapists: () => {
		let therapists = methods.allTherapists();
		therapists = therapists.map((therapist) => ({
			name: therapist.therapistName,
			specialities: therapist.therapistSpecialities,
		}));
		return therapists;
	},
	allSpecialities: async () => {
		const specialities = await Speciality.find();
		return specialities;
	},
	createTherapist: async (args) => {
		const { therapist } = args;
		console.log(args);
		const newTherapist = new Therapist({name: therapist.name});
		await newTherapist.save();
		return newTherapist;
	},
};

exports.root = root;
