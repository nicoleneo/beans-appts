import Vue from "vue";
import Vuex from "vuex";
import apolloClient from "./utils/graphql";
import TherapistsQuery from "./queries/therapistsQuery";
import SpecialitiesQuery from "./queries/specialitiesQuery";
import createTherapist from "./queries/createTherapist";

Vue.use(Vuex);

export const mutations = {
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
			(therapist) => therapist._id !== id
		);
		Vue.set(state, "therapistsData", [...therapistsData]);
	},
};
export const actions = {
	async fetchTherapists({ commit }) {
		console.log("fetch therapists");

		const response = await apolloClient.query({
			query: TherapistsQuery,
		});
		commit("therapistsData", response.data.allTherapists);
	},
	async fetchSpecialities({ commit }) {
		console.log("fetch specialities");
		const response = await apolloClient.query({
			query: SpecialitiesQuery,
		});
		commit("specialitiesData", response.data.allSpecialities);
	},
	async createTherapist({ commit }, variables) {
		const createdTherapist = await apolloClient.mutate({
			mutation: createTherapist,
			variables,
			update: (store, { data: { createTherapist } }) => {
				console.log("update store");
				const data = store.readQuery({
					query: TherapistsQuery,
				});
				data.allTherapists = [...data.allTherapists, createTherapist];
				store.writeQuery({
					query: TherapistsQuery,
					data,
				});
				commit("therapistsData", data.allTherapists);
			},
		});
		commit("therapist", createdTherapist.data.createTherapist);
	},
};

export default new Vuex.Store({
	state: {
		specialitiesData: [],
		therapistsData: [],
		therapist: {
			name: "",
			specialities: [],
		},
	},
	mutations,
	actions,
});
