import { gql } from "apollo-boost";

const TherapistsQuery = gql`
	query {
		allTherapists {
			_id
			name
			specialities {
				_id
				name
			}
		}
	}
`;

export default TherapistsQuery;
