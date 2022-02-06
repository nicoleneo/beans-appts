<template>
  <v-card v-if="therapist" class="pa-4">
    <h2>{{ therapist.name }}</h2>
    <h3>Specialities</h3>
    <v-spacer></v-spacer>
    <v-container fluid grid-list-sm>
      <v-layout row wrap>
        <v-flex
          v-for="speciality in therapist.specialities"
          :key="speciality.name"
          xs6
        >
            {{ speciality.name }}</v-flex
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