"use strict";
const faker = require("@faker-js/faker").faker;
const moment = require("moment");
const fs = require("fs/promises");

const specialities = async () => {
	let allSpecialities = [];
	const specialitiesFile = __dirname + "/therapy_categories.txt";
	try {
		const data = await fs.readFile(specialitiesFile, "utf8");
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

			allSpecialities.push(specialityObj);
		}
		let allSpecialitiesData = JSON.stringify(allSpecialities);
		fs.writeFileSync("allSpecialities.json", allSpecialitiesData);
		return allSpecialities;
	} catch (error) {
		console.error(err);
		return;
	}
};

const randomSpecialities = (allSpecialities) => {
	const selectedSpecialities = faker.random.arrayElements(allSpecialities, 4);
	console.log(selectedSpecialities);
	return selectedSpecialities;
};

const generateDates = (qIds) => {
	console.log("generate dates");
	const today = moment();
	const threeMonths = today.add("3", "months");
	const futureDates = faker.date.betweens(today, threeMonths, 100);
	console.log(futureDates);
};

const generateTherapists = async () => {
	const allSpecialities = await specialities();
	const NUM_THERAPISTS = 10;
	const allTherapists = [];
	for (let i = 0; i < NUM_THERAPISTS; i++) {
		const therapistName = faker.name.findName();
		const therapistSpecialities = randomSpecialities(allSpecialities);
		const therapist = { therapistName, therapistSpecialities };
		allTherapists.push(therapist);
	}
	console.log(allTherapists);
  let allTherapistsData = JSON.stringify(allTherapists);
  fs.writeFileSync("allTherapists.json", allTherapistsData);
	return allTherapists;
};

generateTherapists();
//const allSpecialities = specialities();
