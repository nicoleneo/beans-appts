// External Dependancies
const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const therapistSchema = new mongoose.Schema({
	name: String,
	specialities: [{ type: ObjectId, ref: "Speciality" }],
});

module.exports = mongoose.model("Speciality", therapistSchema);
