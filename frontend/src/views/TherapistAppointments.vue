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
                  <v-btn text color="primary" @click="$refs.timeStartDialog.save(timeStart)">
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
                  <v-btn text color="primary" @click="$refs.timeEndDialog.save(timeEnd)">
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
    timeStartModal: false,
    timeEndModal: false,

    // form
    valid: true,
    selectedTherapist: null,
    date: null,
    timeStart: null,
    timeEnd: null,
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
