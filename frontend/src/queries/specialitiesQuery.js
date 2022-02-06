import { gql } from "apollo-boost";

const SpecialitiesQuery = {
	query: gql`
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
	`,
};

export default SpecialitiesQuery;