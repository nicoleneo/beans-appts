let allTherapistsData = require("./allTherapists.json");
const { v4: uuidv4 } = require('uuid');


const allTherapists = () => {
    console.log("all therapists");
	return allTherapistsData;
};

const addTherapist = therapist => {
    const createdTherapist = { ...therapist, id: uuidv4() };
    allTherapistsData = [...allTherapistsData, createTherapist];
    return createdTherapist;
  };

const therapistsWithSpeciality = (speciality, matchParent = false) => {
	const therapists = allTherapistsData.filter((therapist) => {
		const therapistsWithMatching = therapist.therapistSpecialities.filter(
			(ts) => {
				const matchingSpeciality = ts.name
					.toLowerCase()
					.includes(speciality.toLowerCase());
				if (matchParent) {
					const matchingParent = ts.parent
						? ts.parent.toLowerCase().includes(speciality.toLowerCase())
						: false;
					return matchingSpeciality || matchingParent;
				} else {
					return matchingSpeciality;
				}
			}
		);
		return therapistsWithMatching.length;
	});
	return therapists;
};

exports.allTherapists = allTherapists;
exports.therapistsWithSpeciality = therapistsWithSpeciality;
exports.addTherapist = addTherapist;