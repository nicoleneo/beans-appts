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
		//const { therapist } = args;
		console.log(args);
		return { name: "name" };
		//console.log(therapist);
		//return methods.addTherapist(therapist);
	},
};

exports.root = root;
