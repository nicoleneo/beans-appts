import gql from "graphql-tag";

const createAppointmentSlotMutation = gql`
	mutation createAppointmentSlot($appointmentSlot: AppointmentSlotInput!) {
		createAppointmentSlot(appointmentSlot: $appointmentSlot) {
			_id
			timeStart
			timeEnd
			therapist {
				_id
				name
			}
			bookedBy
			bookedTime
		}
	}
`;

export default createAppointmentSlotMutation;
