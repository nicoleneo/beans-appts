<template>
  <v-card v-if="therapist" class="pa-4">
    <p>{{ therapist.name }}</p>
    <h3>Specialities</h3>
    <v-spacer></v-spacer>
    <v-container fluid grid-list-sm>
      <v-layout row wrap>
        <v-flex
          v-for="speciality in therapist.specialities"
          :key="speciality.name"
          xs6
        >
          <v-btn elevation="2" class="ma-2 pa-2" color="primary">
            {{ speciality.name }}
          </v-btn></v-flex
        >
      </v-layout></v-container
    >
  </v-card>
</template>

<script>
export default {
  name: "Therapist",
  props: {
    therapist: Object,
  },
  components: {},
};
</script>