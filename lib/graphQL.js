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
  },
  type Query {
    allSpecialities: [Speciality],
    allTherapists: [Therapist],
  },
  type Mutation {
    createTherapist(therapist: TherapistInput!): String
  }
`);

exports.schema = schema;
