// External Dependancies
const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const appointmentSlotSchema
 = new mongoose.Schema({
	time: String,
	therapist: { type: ObjectId, ref: "Therapist" },
	bookedBy: String,
	bookedTime: String,
});

module.exports = mongoose.model("AppointmentSlot", appointmentSlotSchema);
