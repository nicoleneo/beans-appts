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
              <v-dialog
                ref="timeStartDialog"
                v-model="timeStartModal"
                :return-value.sync="timeStart"
                persistent
                width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="timeStart"
                    label="Appointment start time"
                    prepend-icon="mdi-clock-time-four-outline"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-time-picker
                  v-if="timeStartModal"
                  format="24hr"
                  v-model="timeStart"
                  :max="timeEnd"
                  :allowed-minutes="allowedMinutes"
                  :allowed-hours="allowedHours"
                >
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="timeStartModal = false">
                    Cancel
                  </v-btn>
                  <v-btn
                    text
                    color="primary"
                    @click="$refs.timeStartDialog.save(timeStart)"
                  >
                    OK
                  </v-btn>
                </v-time-picker>
              </v-dialog>
              <v-dialog
                ref="timeEndDialog"
                v-model="timeEndModal"
                :return-value.sync="timeEnd"
                persistent
                width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="timeEnd"
                    label="Appointment end time"
                    prepend-icon="mdi-clock-time-four-outline"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-time-picker
                  v-if="timeEndModal"
                  format="24hr"
                  v-model="timeEnd"
                  :min="timeStart"
                  :allowed-minutes="allowedMinutes"
                  :allowed-hours="allowedHours"
                >
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="timeEndModal = false">
                    Cancel
                  </v-btn>
                  <v-btn
                    text
                    color="primary"
                    @click="$refs.timeEndDialog.save(timeEnd)"
                  >
                    OK
                  </v-btn>
                </v-time-picker>
              </v-dialog>
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
        <h2>Created appointment slots</h2>
        <v-card
          v-for="appointmentSlot in createdAppointmentSlots"
          :key="appointmentSlot._id"
          elevation="2"
          class="ma-2 pa-2"
        >
          {{ appointmentSlot.date }} {{ appointmentSlot.timeStart }} -
          {{ appointmentSlot.timeEnd }}
          <Therapist :therapist="appointmentSlot.therapist" />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import moment from "moment";
import Therapist from "../components/Therapist.vue";

export default {
  name: "TherapistAppointments",
  components: { Therapist },
  data: () => ({
    // UI
    absolute: true,
    overlay: false,
    overlayMessage: null,
    timeStartModal: false,
    timeEndModal: false,

    // form
    valid: true,
    selectedTherapist: null,
    date: null,
    timeStart: null,
    timeEndValue: null,
  }),
  methods: {
    allowedHours: (v) => v >= 9 && v <= 18,
    allowedMinutes: (v) => v === 0,
    async submit() {
      console.log(this.date);
      console.log(this.timeStart);
      let timeStart = `${this.date} ${this.timeStart}`;
      timeStart = moment(timeStart).format();
      console.log(this.timeEnd);
      let timeEnd = `${this.date} ${this.timeEnd}`;
      timeEnd = moment(timeEnd).format();

      const variables = {
        appointmentSlot: {
          timeStart,
          timeEnd,
          therapistId: this.selectedTherapist,
        },
      };
      this.$store.dispatch("createAppointmentSlot", variables);

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
    timeEnd: {
      get: function () {
        if (!this.timeStart && !this.timeEndValue) return null;
        if (this.timeEndValue) return this.timeEndValue;
        const defaultTimeEnd = moment(this.timeStart, "HH:mm")
          .add(1, "hour")
          .format("HH:mm");
        console.log(defaultTimeEnd);
        return defaultTimeEnd;
      },
      set: function (newValue) {
        this.timeEndValue = newValue;
        return newValue;
      },
    },
    createdAppointmentSlots: function () {
      const formattedAppointmentSlots = this.createdAppointmentSlotsData.map(
        (as) => {
          const slot = {
            timeStart: moment(as.timeStart).format(" H:mm A"),
            timeEnd: moment(as.timeEnd).format(" H:mm A"),
            date: moment(as.timeStart).format("ddd D MMMM YYYY"),
            therapist: this.allTherapists.filter(
              (t) => t._id == as.therapist._id
            )[0],
          };
          return slot;
        }
      );
      return formattedAppointmentSlots;
    },
    ...mapState({
      appointmentSlot: (state) => state.appointmentSlot,
      createdAppointmentSlotsData: (state) => state.createdAppointmentSlotsData,
      specialities: (state) => state.specialitiesData,
      allTherapists: (state) => state.therapistsData,
    }),
  },
};
</script>
