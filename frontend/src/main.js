import Vue from "vue";
import vuetify from "./plugins/vuetify";
import axios from "axios";
import VueAxios from "vue-axios";
import VueApollo from "vue-apollo";
import ApolloClient from "apollo-boost";
import Moment from "vue-moment";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;
Vue.use(Moment);
Vue.use(VueAxios, axios);
Vue.use(VueApollo);

const apolloClient = new ApolloClient({
	// You should use an absolute URL here
	uri: `${process.env.VUE_APP_MY_API}/graphql`,
});
const apolloProvider = new VueApollo({
	defaultClient: apolloClient,
});

new Vue({
	vuetify,
	router,
	store,
	apolloProvider,
	render: (h) => h(App),
}).$mount("#app");
