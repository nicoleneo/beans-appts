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
            <h1>Search for appointments</h1>

            <v-form ref="form" v-model="valid" lazy-validation>
              <v-date-picker v-model="dates" range required></v-date-picker>

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
              <v-btn class="mr-4" @click="submit"> submit </v-btn>
              <v-btn @click="reset"> clear </v-btn>
            </v-form>
          </v-col>
        </v-row>
        <v-row><v-col cols="12"> </v-col></v-row>
      </v-col>
      <v-col cols="12" sm="6" md="8">
        <v-card
          v-for="appointmentSlot in appointmentSlots"
          :key="appointmentSlot._id"
          elevation="2"
          class="ma-2 pa-2"
          color="primary"
        >
          {{ appointmentSlot.date }} {{ appointmentSlot.timeStart }} -
          {{ appointmentSlot.timeEnd }}
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import gql from "graphql-tag";
import { mapState } from "vuex";
import moment from "moment";

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

    // form
    valid: true,
    name: "",
    nameRules: [
      (v) => !!v || "Name is required",
      (v) => (v && v.length >= 3) || "Name must be more than 3 characters",
    ],
    selectedSpecialities: null,
    dates: [],
  }),
  methods: {
    formatSpeciality: (item) => `${item.parent ? "\t – " : ""}${item.name}`,
    async submit() {
      console.log(this.dates);
      const variables = {
        criteria: {
          startDate: this.dates[0],
          endDate: this.dates[1],
          specialities: this.selectedSpecialities,
        },
      };
      this.$store.dispatch("searchAppointmentSlots", variables);
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
  computed: {
    appointmentSlots: function () {
      const formattedAppointmentSlots = this.appointmentSlotsData.map((as) => {
        console.log(as);
        const slot = {
          timeStart: moment(as.timeStart).format(" H:mm A"),
          timeEnd: moment(as.timeEnd).format(" H:mm A"),
          date: moment(as.timeStart).format("ddd D MMMM YYYY"),
        };
        return slot;
      });
      return formattedAppointmentSlots;
    },
    ...mapState({
      appointmentSlotsData: (state) => state.appointmentSlotsData,
      specialities: (state) => state.specialitiesData,
    }),
  },
};
</script>
