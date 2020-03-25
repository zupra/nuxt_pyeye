<template>
  <section>
    <Steps />

    <h1>Список лабораторий с их загрузкой на определенное время вперед</h1>

    <pre>ЛАБОРАТОРИИ:{{laboratoryList}}</pre>

    <h2>Резервирование времени в лаборатории</h2>

    <Button
      type="primary"
      @click="toggleWeekends"
      v-text="calendarWeekends ? 'без выходных':'c выходными'"
    ></Button>

    <Divider>Календарь загрузки лаборатории</Divider>

    <h3>Создать событие</h3>
    <div class="flex my-3">
      <Input v-model="newEvent.title" style="width: 300px" placeholder="Название события"></Input>&emsp;
      <DatePicker type="date" v-model="newEvent.start" placeholder="Начало" @keydown.native.prevent></DatePicker>&emsp;
      <DatePicker
        type="date"
        v-model="newEvent.end"
        placeholder="Окончание"
        @keydown.native.prevent
      ></DatePicker>

      <!-- &emsp;
    <TimePicker v-model="newEvent.start" format="HH:mm" placeholder="Начало"></TimePicker>
    &emsp;
      <TimePicker v-model="newEvent.end" format="HH:mm" placeholder="Окончание"></TimePicker>-->
    </div>
    <Button type="primary" @click="calendarEvents.push(newEvent)">Создать</Button>

    <br />
    <br />

    <client-only>
      <FullCalendar
        class="demo-app-calendar"
        ref="fullCalendar"
        height="650"
        defaultView="dayGridMonth"
        :header="{
      left: 'prev,next today',
      center: 'title',
    }"
        :plugins="calendarPlugins"
        @dateClick="handleDateClick"
        :events="calendarEvents"
        :locale="locale"
        :weekends="calendarWeekends"
      />
    </client-only>

    <!-- 

  <Modal
    :title="`Создать событие ${Date(newEvent.start)}` "
    v-model="eventModal"
    :styles="{top: '30vh'}"
    @on-ok="calendarEvents.push(newEvent)">
    <div>
      <Input v-model="newEvent.title" placeholder="Название события"></Input>
    </div>
  </Modal>
    -->
  </section>
</template>

<script>
import Steps from '~/components/new_project/steps'

import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import ruLocale from '@fullcalendar/core/locales/ru'
// import moment from 'moment'

export default {
  components: {
    Steps,
    FullCalendar
  },
  async asyncData({ app }) {
    const { results } = await app.$axios.$get('/proxy/laboratory/')
    return {
      laboratoryList: results
    }
  },

  data() {
    return {
      // eventModal: false,
      newEvent: {
        title: '',
        start: null,
        end: null,
        allDay: null
      },
      calendarWeekends: true,
      calendarPlugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      locale: ruLocale,
      calendarEvents: [
        { title: 'Event Now', start: new Date() },
        { title: 'Занято на исследование', date: '2020-03-05' },
        {
          title: 'Занято на исследование',
          start: '2020-03-09',
          end: '2020-03-14'
        }
      ]
    }
  },
  methods: {
    toggleWeekends() {
      this.calendarWeekends = !this.calendarWeekends // update a property
    },
    gotoPast() {
      let calendarApi = this.$refs.fullCalendar.getApi() // from the ref="..."
      calendarApi.gotoDate('2000-01-01') // call a method on the Calendar object
    },
    handleDateClick(arg) {
      console.table(arg)

      // this.newEvent.start = arg.dateStr
      // this.newEvent.allDay = arg.allDay
      // this.eventModal = true

      // if (confirm('Would you like to add an event to ' + arg.dateStr + ' ?')) {
      //   this.calendarEvents.push({ // add new event data
      //     title: 'New Event',
      //     start: arg.date,
      //     allDay: arg.allDay
      //   })
      // }

      /**/
      this.$Modal.confirm({
        title: 'Создать событие',
        content: `<div></div>`,
        onOk: () => {
          this.calendarEvents.push({
            // add new event data
            title: 'New Event',
            start: arg.date,
            allDay: arg.allDay
          })
          this.$Message.info('Создано событие')
        },
        onCancel: () => {
          this.$Message.info('Отмена')
        }
      })

      /*
      this.$Modal.confirm({
        render: (h) => {
          return h('Input', {
            props: {
              value: this.value,
              autofocus: true,
              placeholder: 'Создайте событие на то число...'
            },
            on: {
              input: (val) => {.demo-app-calendar
                // this.value = val

                this.calendarEvents.push({ // add new event data
                  title: val,//'New Event',
                  start: arg.date,
                  allDay: arg.allDay
                })
      
              }
            }
          })
        }
      })
      */
    }
  }
}
</script>

<style>
@import '~/node_modules/@fullcalendar/core/main.css';
@import '~/node_modules/@fullcalendar/daygrid/main.css';
@import '~/node_modules/@fullcalendar/timegrid/main.css';

.demo-app-calendar {
  margin: 0 auto;
  max-width: 900px;
}
</style>