<template>
  <v-container class="grey lighten-5">
    <v-overlay :absolute="absolute" :value="overlay">
      <p>{{ overlayMessage }}</p>
      <v-btn @click="overlay = false"> Close </v-btn>
    </v-overlay>
    <v-row no-gutters>
      <v-col cols="12" sm="6" md="4">
        <v-row>
          <v-col cols="12">
            <h1>Therapists</h1>

            <Therapist
              v-for="therapist in allTherapists"
              :therapist="therapist"
              :key="therapist.name"
            />
          </v-col>
        </v-row>
        <v-row><v-col cols="12"> </v-col></v-row>
      </v-col>
      <v-col cols="12" sm="6" md="8"> </v-col>
    </v-row>
  </v-container>
</template>

<script>
import gql from "graphql-tag";
import Therapist from "../components/Therapist.vue";

export default {
  name: "Therapists",
  components: {
    Therapist,
  },
  apollo: {
    allTherapists: gql`
      query {
        allTherapists {
          name
          specialities {
            name
          }
        }
      }
    `,
  },
  data: () => ({
    // UI
    absolute: true,
    overlay: false,
    overlayMessage: null,
  }),
  methods: {},
};
</script>
