"use strict";
const faker = require("@faker-js/faker");
const moment = require("moment");
const fs = require("fs");

const specialities = () => {
	const specialities = [];
	const specialitiesFile = __dirname + "/therapy_categories.txt";
	fs.readFile(specialitiesFile, "utf8", (err, data) => {
		if (err) {
			console.error(err);
			return;
		}
		const lines = data.split("\n");
		let parentCategory = "";
		let prevSpeciality = null;
		for (let lineNo in lines) {
			let speciality = lines[lineNo].trim();
			let isChild = false;
			if (speciality.startsWith("-")) {
				speciality = speciality.replace("-", "").trim();
				parentCategory = prevSpeciality;
				isChild = true;
			} else {
				prevSpeciality = speciality;
			}
			const specialityObj = {
				name: speciality,
			};
			if (isChild) {
				specialityObj.parent = parentCategory;
			}
			specialities.push(specialityObj);
		}
	});
	return specialities;
};

const randomSpecialities = (specialities) => {
	const selectedSpecialities = faker.random.arrayElements(specialities, 4);
	return selectedSpecialities;
};

const generateDates = (qIds) => {
	console.log("generate dates");
	const today = moment();
	const threeMonths = today.add("3", "months");
	const futureDates = faker.date.betweens(today, threeMonths, 100);
	console.log(futureDates);
};

const generateTherapists = () => {
	const allSpecialities = specialities();
	const NUM_THERAPISTS = 10;
	const allTherapists = [];
	for (let i = 0; i < NUM_THERAPISTS; i++) {
		const therapistName = faker.name.findName();
		const therapistSpecialities = randomSpecialities(specialities);
		const therapist = { therapistName, therapistSpecialities };
		allTherapists.push(therapist);
	}
	console.log(allTherapists);
	return allTherapists;
};

generateTherapists();
