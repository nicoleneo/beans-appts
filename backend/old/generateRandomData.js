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
		let allSpecialitiesData = JSON.stringify(allSpecialities, null, 2);
		await fs.writeFile("allSpecialities.json", allSpecialitiesData);
		return allSpecialities;
	} catch (err) {
		console.error(err);
		return;
	}
};

const randomSpecialities = (allSpecialities) => {
	const selectedSpecialities = faker.random.arrayElements(allSpecialities, 4);
	console.log(selectedSpecialities);
	return selectedSpecialities;
};

const generateDates = () => {
	console.log("generate dates");
	const today = moment();
	const oneMonth = moment(today).add("1", "months");
	const futureDates = faker.date.betweens(
		today.toISOString(),
		oneMonth.toISOString(),
		100
	);
	console.log(futureDates);
	return futureDates;
};

function generateRandomAppointmentTime(appointmentDate) {
	const min = 9;
	const max = 17;
	const randomHour = Math.floor(Math.random() * (max - min) + min);
	let appointmentStart = moment(
		moment(appointmentDate).format("YYYY-MM-DD")
	).set("hour", randomHour);
	let appoointmentEnd = moment(
		moment(appointmentDate).format("YYYY-MM-DD")
	).set("hour", randomHour + 1);
	return {
		timeStart: appointmentStart.toISOString(),
		timeEnd: appoointmentEnd.toISOString(),
	};
}

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
	let allTherapistsData = JSON.stringify(allTherapists, null, 2);
	await fs.writeFile("allTherapists.json", allTherapistsData);
	return allTherapists;
};

const generateAppointmentSlots = async () => {
	try {
		let appointmentDates = generateDates();
		const appointmentSlots = [];
		let testTherapistsData = require("../test/data/therapists.json");
		for (let i in testTherapistsData) {
			const therapistName = testTherapistsData[i].therapistName;
			for (let d = 0; d < 10; d++) {
				// 10 dates per therapist
				const randomDateIndex = Math.floor(
					Math.random() * appointmentDates.length
				);
				// remove the randomly selected date from the array
				let randomDate = appointmentDates.splice(randomDateIndex, 1)[0];
				console.log(`random date index ${randomDateIndex}: ${randomDate}`);
				console.log(`remaining length ${appointmentDates.length}`);
				for (let t = 0; t < 2; t++) {
					// generate 2 appointment times in a day
					const randomAppointmentSlot =
						generateRandomAppointmentTime(randomDate);
					randomAppointmentSlot.therapistName = therapistName;
					console.log(randomAppointmentSlot);
					appointmentSlots.push(randomAppointmentSlot);
				}
			}
		}
		//console.log(appointmentSlots);
		let allAppointmentSlotsData = JSON.stringify(appointmentSlots, null, 2);
		await fs.writeFile("appointmentSlots.json", allAppointmentSlotsData);
		return appointmentSlots;
	} catch (err) {
		console.error(err);
		return;
	}
};

//generateTherapists();
//const allSpecialities = specialities();
generateAppointmentSlots();
