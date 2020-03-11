<template lang="pug">

.flex.mt-5
  .mr-5
    p сегодня: {{new Date().toLocaleDateString()}} г.
    pre clickedDay={{clickedDay}}
    pre output={{output}}

  .Calendar
    .Cr-Head
      .Cr-Head_ltMonth.ripple(@click="ltMonth") «
      .Cr-Head_current {{months[currMonth]}} {{currYear}}
      .Cr-Head_gtMonth.ripple(@click="gtMonth") »
    .Cr-Week
      .Cr-Week_day(v-for="day in days") {{day}}
    .Cr-Days
      .Cr-Days_blank(v-for="blank in daysOfPrevMonth") {{blank}}
      .Cr-Days_day(
        v-for="i in daysInMonth",
        :class="{Today: i == Today, clickedDay: i == clickedDay}",
        @click="setDate(i)"
      ) {{i}}
      .Cr-Days_blank(v-for="_,i in qtyDaysNextMonth") {{i+1}}


</template>

<script>
const NOW = new Date()

export default {
  name: 'Calendar',
  //components: {},
  // props: {
  //   field_from: [String, Boolean],
  //   field_to: [String, Boolean],
  //   prop_curr: [String, Number] // предучтановленное число текущего месяца # для вчера норм (new Date().getDate())-1
  // },
  data() {
    return {
      inst_date: NOW,
      days: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
      months: [
        'Янв',
        'Фев',
        'Мар',
        'Апр',
        'Май',
        'Июн',
        'Июл',
        'Авг',
        'Сен',
        'Окт',
        'Ноя',
        'Дек'
      ],
      clickedDay: null,
      output: {
        str: '', //1 Апр 2018
        format: '' //2018-04-01
      }
    }
  },

  computed: {
    currYear() {
      return this.inst_date.getFullYear()
    },
    currMonth() {
      return this.inst_date.getMonth()
    },
    currWD() {
      return this.inst_date.getDay()
    },
    Today() {
      // !TODO wtf
      if (
        this.inst_date.getMonth() === NOW.getMonth() &&
        this.inst_date.getFullYear() === NOW.getFullYear()
      ) {
        return NOW.getDate()
      }
    },
    daysInMonth() {
      return new Date(this.currYear, this.currMonth + 1, 0).getDate()
    },
    _lastDateOfPrevMonth() {
      return new Date(this.currYear, this.currMonth, 0).getDate()
    },
    _qtyDaysPrevMonth() {
      return new Date(this.currYear, this.currMonth, 0).getDay()
    },
    daysOfPrevMonth() {
      return (
        this._qtyDaysPrevMonth &&
        Array.from(
          { length: this._qtyDaysPrevMonth },
          (v, k) => this._lastDateOfPrevMonth - this._qtyDaysPrevMonth + (k + 1)
        )
        /*
        Array.from(
          { length: this._qtyDaysPrevMonth },
          (v, k) => this._lastDateOfPrevMonth - k
        ).reverse()
        */
      )
    },
    qtyDaysNextMonth() {
      return 42 - (this.daysInMonth + this._qtyDaysPrevMonth)
    }
  },
  methods: {
    ltMonth() {
      this.clickedDay = null
      // this.clickedDay && this.reset()
      this.inst_date = new Date(this.currYear, this.currMonth - 1)
    },
    gtMonth() {
      this.clickedDay = null
      // this.clickedDay && this.reset()
      this.inst_date = new Date(this.currYear, this.currMonth + 1)
    },
    // reset() {
    //   this.clickedDay = null
    //   // this.output.str = ''
    //   this.$emit('setdate', null)
    // },
    setDate(day) {
      this.clickedDay = day

      const fixDay = day < 10 ? '0' + day : day
      const fixMonth =
        this.currMonth + 1 < 10
          ? '0' + (this.currMonth + 1)
          : this.currMonth + 1

      this.output.str = `${day} ${this.months[this.currMonth]} ${this.currYear}`
      this.output.format = `${this.currYear}-${fixMonth}-${fixDay}`

      this.$emit('setdate', this.output)
    }
  }
}
</script>

<style lang="stylus">
@import '~@/components/Calendar/_calendar.styl'
</style>