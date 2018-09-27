const DATE = 1538051516;
const MINUTES_IN_STEP = 15;

new Vue({
  el: '#app',
  data() {
    return {
      timeOptions: this.getTimeOptions(DATE),
      appointments: [],
      showCreateAppointmentInterface: false,
      from: 0,
      to: 0,
      sektors: [],
    };
  },
  watch: {
    appointments: {
      handler() {
      },
      deep: true,
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
          step: moment.duration(time.diff(start)).asMinutes() / step,
        });
      }

      return timeOptions;
    },
    addAppointment() {
      this.appointments.push({
        from: this.from,
        to: this.to,
      });

      this.showCreateAppointmentInterface = false;
      this.addSektor(this.appointments.length - 1)
    },
    addSektor(index) {
      const sektor = new Sektor('.today', {
        size: 50,
        stroke: 2,
        arc: true,
        angle: 310,
        sectorColor: '#bD2828',
        circleColor: 'none',
        fillCircle: false,
      });

      this.sektors.push(sektor);
    },
  },
});
