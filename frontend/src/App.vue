<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-icon x-large dark class="mr4">mdi-coffee</v-icon>
        <h1>Beans appointments</h1>
      </div>

      <v-spacer></v-spacer>
      <ol>
        <li>
          <router-link to="/" class="white--text">Specialities</router-link>
        </li>
        <li>
          <router-link to="/therapists" class="white--text"
            >Therapists</router-link
          >
        </li>
      </ol>
    </v-app-bar>

    <v-main>
      <router-view :key="$route.fullPath"></router-view>
    </v-main>
  </v-app>
</template>

<script>
import TherapistsQuery from './queries/therapistsQuery';
import SpecialitiesQuery from './queries/specialitiesQuery';


export default {
  name: "App",

  components: {},
  async beforeMount() {
    try {
      let response = await this.$apollo.query(SpecialitiesQuery);
      this.$store.commit("specialitiesData", response.data.allSpecialities);
      response = await this.$apollo.query(TherapistsQuery);
      this.$store.commit("therapistsData", response.data.allTherapists);
    } catch (error) {
      console.log(error);
    }
  },
  data: () => ({
    //
  }),
};
</script>
