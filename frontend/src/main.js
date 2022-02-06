import Vue from "vue";
import vuetify from "./plugins/vuetify";
import axios from "axios";
import VueAxios from "vue-axios";
import VueApollo from "vue-apollo";
import Moment from "vue-moment";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import apolloClient from "./utils/graphql";

Vue.config.productionTip = false;
Vue.use(Moment);
Vue.use(VueAxios, axios);
Vue.use(VueApollo);

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
