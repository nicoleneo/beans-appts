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
          <router-link to="/" class="white--text">Search for appointments</router-link>
        </li>
        <li>
          <router-link to="/therapists" class="white--text"
            >Therapists</router-link
          >
        </li>
        <li>
          <router-link to="/therapist-appointments" class="white--text"
            >Therapists create appointments</router-link
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
export default {
  name: "App",

  components: {},
  async beforeMount() {
    this.$store.dispatch("fetchSpecialities");
    this.$store.dispatch("fetchTherapists");
  },
  data: () => ({
    //
  }),
};
</script>
