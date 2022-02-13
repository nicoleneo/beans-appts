const AppointmentSlot = require("../models/AppointmentSlot");
const Speciality = require("../models/Speciality");
const Therapist = require("../models/Therapist");
const moment = require("moment");

const root = {
	allTherapists: async () => {
		console.log("all therapists");
		const therapists = await Therapist.find().populate("specialities");
		return therapists;
	},
	allSpecialities: async () => {
		console.log("all specialities");
		const specialities = await Speciality.find().populate("parent");
		return specialities;
	},
	createTherapist: async (args) => {
		const {
			therapist: { name, specialities },
		} = args;
		const newTherapist = new Therapist({ name, specialities });
		return newTherapist
			.save()
			.then((newTherapist) => newTherapist.populate("specialities"));
	},
	createAppointmentSlot: async (args) => {
		const {
			appointmentSlot: { timeStart, timeEnd, therapistId },
		} = args;
		const newAppointmentSlot = new AppointmentSlot({
			timeStart: moment(timeStart).toISOString(),
			timeEnd: moment(timeEnd).toISOString,
			therapist: therapistId,
		});
		return newAppointmentSlot
			.save()
			.then((newAppointmentSlot) => newAppointmentSlot.populate("therapist"));
	},
	bookAppointmentSlot: async (args) => {
		const {
			booking: { appointmentSlotId, bookedBy, bookedTime },
		} = args;
		const appointmentSlot = AppointmentSlot.findById(appointmentSlotId);
		appointmentSlot.bookedBy = bookedBy;
		appointmentSlot.bookedTime = bookedTime;
		return appointmentSlot
			.save()
			.then((newAppointmentSlot) => newAppointmentSlot.populate("therapist"));
	},
	searchAppointmentSlots: async (args) => {
		const {
			criteria: { startDate, endDate, specialities },
		} = args;
		console.log(args);
		let therapistIds = await Therapist.find(
			{
				specialities: { $in: specialities },
			},
			"_id"
		);
		console.log("therapists");
		console.log(therapistIds);
		const startOfDayStartDate = moment(startDate).startOf("day").toISOString();
		const endofDayEndDate = moment(endDate).endOf("day").toISOString();
		const appointmentSlots = await AppointmentSlot.find({
			therapist: { $in: therapistIds },
			timeStart: {
				$gte: startOfDayStartDate,
				$lte: endofDayEndDate,
			},
		});
		console.log(appointmentSlots);
		return appointmentSlots;
	},
};

exports.root = root;
