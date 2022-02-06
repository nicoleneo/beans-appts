import { gql } from "apollo-boost";

const TherapistsQuery = {
	query: gql`
		query {
			allTherapists {
				name
				specialities {
					name
				}
			}
		}
	`,
};

export default TherapistsQuery;