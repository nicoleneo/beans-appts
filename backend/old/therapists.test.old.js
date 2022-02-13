const methods = require("./methods.old");

describe("therapists", () => {
	test("allTherapists returns correct number", () => {
		const allTherapists = methods.allTherapists();
        expect(allTherapists).toHaveLength(10);
	});
    test("search by speciality search doesn't include parent category", () => {
		const matchingTherapists = methods.therapistsWithSpeciality('Anxiety', false);
        expect(matchingTherapists).toHaveLength(4);
	});
    test("search by speciality search includes parent category", () => {
		const matchingTherapists = methods.therapistsWithSpeciality('Anxiety', true);
        expect(matchingTherapists).toHaveLength(5);
	});
});