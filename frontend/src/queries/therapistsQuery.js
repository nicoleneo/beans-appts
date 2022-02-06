import { gql } from "apollo-boost";

const TherapistsQuery = {
	query: gql`
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
	`,
};

export default TherapistsQuery;