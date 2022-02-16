const mongoose = require("mongoose");
const Speciality = require("../models/Speciality");
const AppointmentSlot = require("../models/AppointmentSlot");
const Therapist = require("../models/Therapist");
const moment = require("moment");


const root = require("../lib/root").root;
const initData = require("../lib/initData");

/* mocking Mongoose data code from https://javascript.plainenglish.io/unit-testing-node-js-mongoose-using-jest-106a39b8393d */
beforeAll(async () => {
	console.log("connecting to test db");
	await initData.testDBConnect();
});
beforeEach(async () => {
	console.log("seed data");
	await initData.seedSpecialities();
	await initData.seedTestTherapists();
});
afterEach(async () => {
	const collections = mongoose.connection.collections;
	for (const key in collections) {
		const collection = collections[key];
		await collection.deleteMany();
	}
});
afterAll(async () => {
	await mongoose.connection.dropDatabase();
	await mongoose.connection.close(true);
	await mongoose.disconnect();
	console.log("disconnected mongoose");
});
/*
describe("specialities", () => {
	test("allSpecialities returns correct number after seed", async () => {
		const allSpecialities = await root.allSpecialities();
		expect(allSpecialities).toHaveLength(100);
	});
});
*/

describe("therapists", () => {
	test("create therapist", async () => {
		const chosenSpecialities = [
			"Personality disorders",
			"Obsessive-compulsive personality disorder",
		];
		let specialities = await root.allSpecialities();
		specialities = specialities.filter((s) =>
			chosenSpecialities.includes(s.name)
		);
		console.log(specialities);
		specialities = specialities.map((s) => s._id);
		const therapist = { name: "Sherry Little", specialities };
		const createdTherapist = await root.createTherapist({ therapist });
		console.log(createdTherapist);
		expect(createdTherapist.specialities).toHaveLength(2);
	});
});

describe("appointment slots", () => {
	test("create appointment slot creates", async () => {
		const beforeLength = await AppointmentSlot.find().countDocuments();
		const timeStart = moment("2022-02-24T11:00:00.000Z").toISOString();
		const timeEnd = moment("2022-02-24T12:00:00.000Z").toISOString();

		const therapistId = await Therapist.findOne({
			name: "Christina Runolfsson",
		}).exec()._id;
		const appointmentSlot = {
			timeStart,
			timeEnd,
			therapistId,
		};
		const createdAppointmentSlot = await root.createAppointmentSlot({
			appointmentSlot,
		});
		const afterLength = await AppointmentSlot.find().countDocuments();
		expect(afterLength).toEqual(beforeLength + 1);
	});
	test("Therapists have all specialisms requested", async () => {
	});
	test("time range of appointments is correct", async () => {
	});
	test("NOT IMPLEMENTED: booked appointments do not show", async () => {
	});
	
});

describe("appointment slots booking", () => {
	test("can book appointments", async () => {
	});
	test("no double-booking", async () => {
	});
});