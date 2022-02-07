const { buildSchema } = require("graphql");

const schema = buildSchema(`
  type Speciality {
    name: String,
    parent: Speciality
    _id: String
  },
  type Therapist {
    _id: String,
    name: String
    specialities: [Speciality]
  },
  type AppointmentSlot {
    _id: String
    timeStart: String
    timeEnd: String
    therapist: Therapist
    bookedBy: String
    bookedTime: String
  }
  input TherapistInput {
    name: String
    specialities: [String]
  },
  input CriteriaInput {
    startDate: String
    endDate: String
    specialities: [String]
  }
  input AppointmentSlotInput {
    timeStart: String
    timeEnd: String
    therapistId: String
  }
  input BookingInput {
    appointmentSlotId: String
    bookedBy: String
    bookedTime: String
  }
  type Query {
    allSpecialities: [Speciality],
    allTherapists: [Therapist],
    searchAppointmentSlots(criteria: CriteriaInput!): [AppointmentSlot]
  },
  type Mutation {
    createTherapist(therapist: TherapistInput!): Therapist
    createAppointmentSlot(appointmentSlot: AppointmentSlotInput!): AppointmentSlot
    bookAppointmentSlot(booking: BookingInput): AppointmentSlot
  }
`);

exports.schema = schema;
