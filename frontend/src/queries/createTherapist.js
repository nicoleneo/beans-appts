import gql from "graphql-tag";

const createTherapist = gql`
	mutation createTherapist($therapist: TherapistInput!) {
		createTherapist(therapist: $therapist) {
			id
			name
			specialities {
				id
				name
				parent {
					id
					name
				}
			}
		}
	}
`;

export default createTherapist;
