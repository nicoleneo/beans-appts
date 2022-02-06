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
    time: String
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
  type Query {
    allSpecialities: [Speciality],
    allTherapists: [Therapist],
    searchAppointmentSlots(criteria: CriteriaInput!): [AppointmentSlot]
  },
  type Mutation {
    createTherapist(therapist: TherapistInput!): Therapist
  }
`);

exports.schema = schema;
