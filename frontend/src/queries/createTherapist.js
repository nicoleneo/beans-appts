import gql from "graphql-tag";

const createTherapist = gql`
	mutation createTherapist($therapist: TherapistInput!) {
		createTherapist(therapist: $therapist) {
			_id
			name
			specialities {
				_id
				name
				parent {
					_id
					name
				}
			}
		}
	}
`;

export default createTherapist;
