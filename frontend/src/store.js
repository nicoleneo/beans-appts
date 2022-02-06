import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
        specialitiesData: [],
		therapistsData: [],
		therapist: {
			name: "",
			specialities: [],
		},
	},
	mutations: {
		specialitiesData(state, data) {
			Vue.set(state, "specialitiesData", [...data]);
		},
        therapistsData(state, data) {
			Vue.set(state, "therapistsData", [...data]);
		},
		therapist(state, data) {
			state.therapist = data;
		},
		deleteTherapist(state, id) {
			const therapistsData = state.therapistsData.filter(
				(therapist) => therapist.id !== id
			);
			Vue.set(state, "therapistsData", [...therapistsData]);
		},
	},
});
