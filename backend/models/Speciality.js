// External Dependancies
const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const specialitySchema = new mongoose.Schema({
	name: String,
	parent: { type: ObjectId, ref: "Speciality" },
});

module.exports = mongoose.model("Speciality", specialitySchema);
