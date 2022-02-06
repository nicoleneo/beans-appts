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
            <h1>Specialities</h1>

            <v-btn
              v-for="speciality in allSpecialities"
              :key="speciality.name"
              elevation="2"
              class="ma-2 pa-2"
              color="primary"
            >
              {{ speciality.name }}
            </v-btn>
          </v-col>
        </v-row>
        <v-row
          ><v-col cols="12">
           
            </v-col
        ></v-row>
      </v-col>
      <v-col cols="12" sm="6" md="8"> </v-col>
    </v-row>
  </v-container>
</template>

<script>
import gql from "graphql-tag";

export default {
  name: "Specialities",
  //components: {},
  apollo: {
    allSpecialities: gql`
      query {
        allSpecialities {
          name
          parent {
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
