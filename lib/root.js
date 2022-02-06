const methods = require("../methods");

const root = {
	allTherapists: () => {
		let therapists = methods.allTherapists();
		therapists = therapists.map((therapist) => ({
			name: therapist.therapistName,
			specialities: therapist.therapistSpecialities,
		}));
		return therapists;
	},
	allSpecialities: () => {
		return methods.allSpecialities();
	},
	createTherapist: (args) => {
		const { therapist } = args;
		return methods.addTherapist(therapist);
	},
};

exports.root = root;
