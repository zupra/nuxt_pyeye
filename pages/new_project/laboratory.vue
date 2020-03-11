<template>
  <section>
    <Steps />

    <h1>Список лабораторий с их загрузкой на определенное время вперед</h1>
    <h2>Резервирование времени в лаборатории</h2>

    <Divider>Календарь загрузки лаборатории</Divider>

    <!-- <no-ssr>
      <FullCalendar
          defaultView="dayGridMonth"
          :plugins="calendarPlugins"
    /> </no-ssr>-->
    <client-only>
      <FullCalendar
        defaultView="dayGridMonth"
        @dateClick="handleDateClick"
        :plugins="calendarPlugins"
        :events="events"
        :locale="locale"
        :header="{ right: 'addEventButton dayGridMonth,timeGridWeek prev,today,next' }"
        ref="fullCalendar"
      />
    </client-only>
  </section>
</template>

<script>
import Steps from '~/components/new_project/steps'

import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import ruLocale from '@fullcalendar/core/locales/ru'
// import moment from 'moment'

export default {
  components: {
    Steps,
    FullCalendar
  },
  data() {
    return {
      calendarPlugins: [dayGridPlugin],
      locale: ruLocale,
      events: [
        { title: 'Занято на исследование', date: '2020-03-05' },
        {
          title  : 'Занято на исследование',
          start  : '2020-03-09',
          end    : '2020-03-14'
        }
      ],
      start: null,
      end: null,
      activeDate: null
    }
  },

  methods: {
    handleDateClick(arg) {
      alert(arg.date)
    }
  }
}
</script>

<style>
@import '~/node_modules/@fullcalendar/core/main.css';
@import '~/node_modules/@fullcalendar/daygrid/main.css';

/* @import '~@fullcalendar/core/main.css';
@import '~@fullcalendar/daygrid/main.css';
@import '~@fullcalendar/timegrid/main.css'; */
</style>