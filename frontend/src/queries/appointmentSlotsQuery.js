import { gql } from "apollo-boost";

const AppointmentSlotsQuery = gql`
	query searchAppointmentSlots($criteria: CriteriaInput!){
		searchAppointmentSlots(criteria: $criteria) {
			_id
			timeStart
			timeEnd
			therapist {
				_id
				name
				specialities {
					_id
				}
			}
		}
	}
`;

export default AppointmentSlotsQuery;
