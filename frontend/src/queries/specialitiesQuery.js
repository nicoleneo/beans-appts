import { gql } from "apollo-boost";

const SpecialitiesQuery = gql`
	query {
		allSpecialities {
			_id
			name
			parent {
				_id
				name
			}
		}
	}
`;

export default SpecialitiesQuery;
