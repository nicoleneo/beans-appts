const mongoose = require("mongoose");
const Speciality = require("../models/Speciality");
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
});
afterEach(async () => {
	const collections = mongoose.connection.collections;
	for (const key in collections) {
		const collection = collections[key];
		await collection.deleteMany();
	}
	jest.runAllTimers();
});
afterAll(async () => {
	jest.useRealTimers();
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
	test("allTherapists returns correct number", async () => {
		const allTherapists = await root.allTherapists();
		expect(allTherapists).toHaveLength(0);
	});
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
		specialities = specialities.map(s => s._id);
		const therapist = { name: "Sherry Little", specialities };
		const createdTherapist = await root.createTherapist({therapist});
		console.log(createdTherapist);
		expect(createdTherapist.specialities).toHaveLength(2);
	}); 
	test("search by speciality search includes parent category", () => {
		/* const matchingTherapists = methods.therapistsWithSpeciality('Anxiety', true);
        expect(matchingTherapists).toHaveLength(5); */
	});
});
