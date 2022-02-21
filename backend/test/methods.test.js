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
	await initData.seedAppointmentData();
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
describe("specialities", () => {
	test("allSpecialities returns correct number after seed", async () => {
		const allSpecialities = await root.allSpecialities();
		expect(allSpecialities).toHaveLength(100);
	});
});

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
		console.log("created");
		console.log(createdAppointmentSlot);
		const afterLength = await AppointmentSlot.find().countDocuments();
		expect(afterLength).toEqual(beforeLength + 1);
	});
	test("Therapists have all specialisms requested", async () => {
		const chosenSpecialities = ["Infertility", "Bullying"];
		let specialities = await root.allSpecialities();
		specialities = specialities.filter((s) =>
			chosenSpecialities.includes(s.name)
		);
		specialities = specialities.map((s) => s._id);

		const startDate = "2022-02-21";
		const endDate = "2022-03-16";
		const appointmentResults = await root.searchAppointmentSlots({
			criteria: { startDate, endDate, specialities },
		});

		// find therapists
		const therapistIds = appointmentResults.map((as) => as.therapist);
		const therapists = await Therapist.find({
			_id: { $in: therapistIds },
		});
		expect(therapists).toHaveLength(2); // 2 therapists with both these specialities
		// check therapists have all the requested specialities
		expect(therapists).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					specialities: expect.arrayContaining(specialities),
				}),
			])
		);
	});
	test("time range of appointments is correct", async () => {
		const chosenSpecialities = ["Post-traumatic stress disorder"];
		let specialities = await root.allSpecialities();
		specialities = specialities.filter((s) =>
			chosenSpecialities.includes(s.name)
		);
		specialities = specialities.map((s) => s._id.toString());

		const startDate = "2022-02-21";
		const endDate = "2022-03-08";
		const appointmentResults = await root.searchAppointmentSlots({
			criteria: { startDate, endDate, specialities },
		});
		// not to contain dates > endDate
		expect(appointmentResults).not.toContainEqual({
			timeStart: "2022-03-09T13:00:00.000Z",
		});
	});
});

describe("appointment slots booking", () => {
	let firstAvailableAppointmentId = null;
	test("can book appointments", async () => {
		const chosenSpecialities = ["Bipolar disorder"];
		let specialities = await root.allSpecialities();
		specialities = specialities.filter((s) =>
			chosenSpecialities.includes(s.name)
		);
		specialities = specialities.map((s) => s._id.toString());

		const startDate = "2022-02-21";
		const endDate = "2022-03-08";
		const appointmentResults = await root.searchAppointmentSlots({
			criteria: { startDate, endDate, specialities },
		});
		const beforeLength = appointmentResults.length;
		const firstAvailableAppointment = appointmentResults[0];
		const bookedBy = "Nicole";
		const bookedTime = moment("2022-02-22T10:12:00.000Z").toISOString();
		firstAvailableAppointmentId = firstAvailableAppointment._id;
		const bookedAppointment = await root.bookAppointmentSlot({
			booking: {
				appointmentSlotId: firstAvailableAppointmentId,
				bookedBy,
				bookedTime,
			},
		});
		console.log(bookedAppointment);
		// booking info is on the appointment
		expect(bookedAppointment).toEqual(
			expect.objectContaining({
				_id: firstAvailableAppointment._id,
				bookedBy,
				bookedTime,
			})
		);

		const updatedAppointmentResults = await root.searchAppointmentSlots({
			criteria: { startDate, endDate, specialities },
		});
		// number of available appointments - 1
		expect(updatedAppointmentResults).toHaveLength(beforeLength - 1);
		// booked appointment shouldn't appear
		expect(updatedAppointmentResults).not.toContainEqual({
			appointmentSlotId: firstAvailableAppointment._id,
		});
	});
	test("no double-booking", async () => {
		const bookedBy = "Another person";
		const bookedTime = moment("2022-02-22T10:12:01.000Z").toISOString();
		const bookUnavailableAppointment = async () => {
			await root.bookAppointmentSlot({
				booking: {
					appointmentSlotId: firstAvailableAppointmentId,
					bookedBy,
					bookedTime,
				},
			});
		};
		expect(bookUnavailableAppointment()).rejects.toThrow(
			new Error("error booking appointment")
		);
	});
});
