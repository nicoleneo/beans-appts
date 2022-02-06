import { gql } from "apollo-boost";

const SpecialitiesQuery = {
	query: gql`
		query {
			allSpecialities {
				name
				parent {
					name
				}
			}
		}
	`,
};

export default SpecialitiesQuery;