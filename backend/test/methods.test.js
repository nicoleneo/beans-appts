const mongoose = require("mongoose");
const root = require("../lib/root");
const initData = require("../lib/initData");

/* mocking Mongoose data code from https://javascript.plainenglish.io/unit-testing-node-js-mongoose-using-jest-106a39b8393d */
beforeAll(() => {
	console.log("connecting to test db");
	initData.testDBConnect();
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
	await mongoose.connection.close();
});

describe("therapists", () => {
	test("allTherapists returns correct number", async () => {
		const allTherapists = await root.allTherapists();
		expect(allTherapists).toHaveLength(0);
	});
	test("search by speciality search doesn't include parent category", () => {
		/* const matchingTherapists = methods.therapistsWithSpeciality('Anxiety', false);
        expect(matchingTherapists).toHaveLength(4); */
	});
	test("search by speciality search includes parent category", () => {
		/* const matchingTherapists = methods.therapistsWithSpeciality('Anxiety', true);
        expect(matchingTherapists).toHaveLength(5); */
	});
});
