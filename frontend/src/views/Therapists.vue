<template>
  <v-container class="grey lighten-5">
    <v-overlay :absolute="absolute" :value="overlay">
      <p>{{ overlayMessage }}</p>
      <v-btn @click="overlay = false"> Close </v-btn>
    </v-overlay>
    <v-row no-gutters>
      <v-col cols="12" sm="6" md="4" class="pa-6">
        <v-row>
          <v-col cols="12">
            <h1>Therapists</h1>

            <Therapist
              v-for="therapist in allTherapists"
              :therapist="therapist"
              :key="therapist._id"
              class="ma-4"
            />
          </v-col>
        </v-row>
        <v-row><v-col cols="12"> </v-col></v-row>
      </v-col>
      <v-col cols="12" sm="6" md="8" class="pa-6">
        <h1>Create Therapist</h1>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="name"
            :rules="nameRules"
            label="Name"
            required
          ></v-text-field>

          <v-select
            v-model="selectedSpecialities"
            :items="specialities"
            :item-text="formatSpeciality"
            item-value="_id"
            :rules="[(v) => !!v || 'At least one speciality is required']"
            label="Select specialities"
            data-vv-name="select"
            multiple
            required
          ></v-select>
          <v-btn class="mr-4" @click="fakeName"> fake name </v-btn>
          <v-btn class="mr-4" @click="submit"> submit </v-btn>
          <v-btn @click="reset"> clear </v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import { faker } from "@faker-js/faker";

import Therapist from "../components/Therapist.vue";

export default {
  name: "Therapists",
  components: {
    Therapist,
  },

  data: () => ({
    // UI
    absolute: true,
    overlay: false,
    overlayMessage: null,

    // form
    valid: true,
    name: "",
    nameRules: [
      (v) => !!v || "Name is required",
      (v) => (v && v.length >= 3) || "Name must be more than 3 characters",
    ],
    selectedSpecialities: null,
  }),
  methods: {
    formatSpeciality: (item) => `${item.parent ? "\t – " : ""}${item.name}`,
    fakeName() {
      const generatedName = faker.name.findName();
      this.name = generatedName;
    },
    async submit() {
      const variables = {
        therapist: {
          name: this.name,
          specialities: this.selectedSpecialities,
        },
      };
      this.$store.dispatch("createTherapist", variables);
      this.reset();
    },
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
  },
  computed: mapState({
    allTherapists: (state) => state.therapistsData,
    specialities: (state) => state.specialitiesData,
  }),
};
</script>
