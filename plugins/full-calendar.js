import Vue from 'vue';
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'

// Vue.use(FullCalendar);
Vue.component('FullCalendar', FullCalendar);
// Vue.component('dayGridPlugin', dayGridPlugin);
Vue.use(dayGridPlugin);

