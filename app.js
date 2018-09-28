const DATE = 1538115376;
const MINUTES_IN_STEP = 15;

new Vue({
  el: '#app',
  data() {
    return {
      timeOptions: this.getTimeOptions(DATE),
      appointments: [],
      showCreateAppointmentInterface: false,
      from: moment.unix(DATE).hours(0).minutes(0).unix(),
      to: moment.unix(DATE).hours(0).minutes(15).unix(),
      timeArcs: [],
    };
  },
  computed: {
    appointmentsView() {
      const appointments = this.appointments.map((appointment) => {
        const from = moment.unix(appointment.from).format('LT');
        const to = moment.unix(appointment.to).format('LT');

        return `${from} - ${to}`;
      });

      return appointments.join(', ');
    }
  },
  methods: {
    getTimeOptions(date) {
      const timeOptions = [];
      const start = moment.unix(date).hours(0).minutes(0);
      const step = MINUTES_IN_STEP;

      for(let time = moment(start);
        time.date() === start.date();
        time.add(step, 'minutes')) {
        timeOptions.push({
          label: time.format('LT'),
          value: time.unix(),
        });
      }

      return timeOptions;
    },
    addAppointment() {
      const appointment = {
        from: this.from,
        to: this.to,
      };

      this.appointments.push(appointment);

      this.showCreateAppointmentInterface = false;
      this.addTimeArc(appointment)
    },
    addTimeArc(appointment) {
      const timeArc = new TimeArc('.today', appointment.from, appointment.to);

      this.timeArcs.push(timeArc);
    },
  },
});
