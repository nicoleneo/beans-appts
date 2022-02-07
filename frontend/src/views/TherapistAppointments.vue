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
            <h1>Create appointment slots</h1>

            <v-form ref="form" v-model="valid" lazy-validation>
              <v-date-picker v-model="date" required></v-date-picker>
              <v-time-picker
                v-model="timeStart"
                :allowed-minutes="allowedMinutes"
                :allowed-hours="allowedHours"
                class="mt-4"
                format="24hr"
              ></v-time-picker>
              <v-select
                v-model="selectedTherapist"
                :items="allTherapists"
                item-text="name"
                item-value="_id"
                :rules="[(v) => !!v || 'Therapist required']"
                label="Select therapist"
                data-vv-name="select"
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
        <v-btn
          v-for="appointmentSlot in appointmentSlots"
          :key="appointmentSlot._id"
          elevation="2"
          class="ma-2 pa-2"
          color="primary"
        >
          {{ appointmentSlot.date }} {{ appointmentSlot.timeStart }} -
          {{ appointmentSlot.timeEnd }}
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import moment from "moment";

export default {
  name: "TherapistAppointments",
  components: {},
  data: () => ({
    // UI
    absolute: true,
    overlay: false,
    overlayMessage: null,

    // form
    valid: true,
    selectedTherapist: null,
    date: null,
    timeStart: null,
  }),
  methods: {
    allowedHours: (v) => v >= 9 && v <= 18,
    allowedMinutes: (v) => v  === 0,
    async submit() {
      console.log(this.date);
      console.log(this.timeStart);
      let startTime = `${this.date} ${this.timeStart}`;
      console.log(startTime);
      /*
      const variables = {
        criteria: {
          startDate: this.dates[0],
          endDate: this.dates[1],
          specialities: this.selectedSpecialities,
        },
      };
      this.$store.dispatch("searchAppointmentSlots", variables);
      */
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
        const slot = {
          startTime: moment(as.startTime).format(" H:mm A"),
          endTime: moment(as.endTime).format(" H:mm A"),
          date: moment(as.startTime).format("ddd D MMMM YYYY"),
        };
        return slot;
      });
      return formattedAppointmentSlots;
    },
    ...mapState({
      appointmentSlotsData: (state) => state.appointmentSlotsData,
      specialities: (state) => state.specialitiesData,
      allTherapists: (state) => state.therapistsData,
    }),
  },
};
</script>
