const { buildSchema } = require("graphql");

const schema = buildSchema(`
  type Speciality {
    name: String,
    parent: Speciality
    id: Int
  },
  type Therapist {
    id: Int,
    name: String
    specialities: [Speciality]
  },
  input TherapistInput {
    name: String
    specialities: [String]
  },
  type Query {
    allSpecialities: [Speciality],
    allTherapists: [Therapist],
  },
  type Mutation {
    createTherapist(therapist: TherapistInput!): Therapist
  }
`);

exports.schema = schema;
