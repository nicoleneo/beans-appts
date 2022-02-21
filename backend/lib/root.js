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
		const formattedTimeStart = moment(timeStart).toISOString();
		const formattedTimeEnd = moment(timeEnd).toISOString();
		const existingSlot = await AppointmentSlot.find({
			timeStart: formattedTimeStart,
			timeEnd: formattedTimeEnd,
			therapist: therapistId,
		}).exec();
		if (existingSlot.length > 0) {
			console.error(exists);
			throw new Error("appointment slot exists");
		}
		const newAppointmentSlot = new AppointmentSlot({
			timeStart: formattedTimeStart,
			timeEnd: formattedTimeEnd,
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
		console.log(appointmentSlotId);
		const appointmentSlot = await AppointmentSlot.findOne({
			_id: appointmentSlotId,
			bookedTime: null,
		}).exec();
		if (!appointmentSlot) throw new Error("error booking appointment");
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
				specialities: { $all: specialities },
			},
			"_id"
		);
		const startOfDayStartDate = moment(startDate).startOf("day").toISOString();
		const endofDayEndDate = moment(endDate).endOf("day").toISOString();
		const appointmentSlots = await AppointmentSlot.find({
			therapist: { $in: therapistIds },
			bookedTime: null,
			timeStart: {
				$gte: startOfDayStartDate,
				$lte: endofDayEndDate,
			},
		}).sort("timeStart");
		//console.log(appointmentSlots);
		return appointmentSlots;
	},
};

exports.root = root;
