<template lang="pug">

section
  center
    h1 Главная страница
    p.mb-4 Пользователь выбирает работу (3 пути)
  .flex.x_center.center
    N-link.CIRCLE.mx-4(v-for='It in links', :to='`${It.link}`') {{It.name}}
  //- pre {{$data}}

  Divider

  h3 Выбрать лабораторию 
    span.text_x2 {{laboratory_id}}
  RadioGroup(v-model="laboratory_id" type="button")
    Radio(
      size="large"
      v-for="It in laboratory"
      :label="It.id"
    ) {{It.name}}

  template(
    v-if="laboratory_id"
  )
    h3.mt-4 Эксперименты лаборатории 
      span.text_x2 {{experiment_id}}
    //- pre {{experimentByLab}}

    .SCROLL(
      v-if="experimentByLab.length"
    )
      Collapse(simple)
        Panel(
          v-for="(exp,idx) in experimentByLab" :name="String(idx+1)"
        )

          Button(
            :type="exp.id === experiment_id ? 'info':'dashed'"
            shape="circle"
            @click.stop="experiment_id = exp.id"
          ) exp_id {{exp.id}}
          | &emsp;
          | {{exp.name}}
          div(slot="content")
            pre {{exp}}
    .bold(
      v-else
    ) нет экспериментов

    Divider
    template(
      v-if="experiment_id"
    )
      .text_x2.center.mb-4 для лаборатория: 
        b.text_x2 {{laboratory_id}}
        | , эксперимент: 
        b.text_x2 {{experiment_id}}


      .GRID
        .GRID_item
          Button(
            @click="GET('stimul')"
          ) получить Стимулы
          pre СТИМУЛЫ:{{stimul}}
        .GRID_item
          Button(
            @click="GET('sausage')"
          ) получить Визиоряды
          pre ВИЗИОРЯДЫ:{{sausage}}
        .GRID_item
          Button(
            @click="GET('respondent')"
          ) получить Респондентов
          pre РЕСПОНДЕНТЫ:{{respondent}}
        .GRID_item
          Button(
            @click="GET('group')"
          ) получить Группы
          pre ГРУППЫ:{{group}}
        .GRID_item
          Button(
            @click="GET('data')"
          ) получить Данные
          pre ДАННЫЕ:{{data}}
        .GRID_item
          Button(
            @click="GET('report')"
          ) получить Отчеты
          pre ОТЧЕТЫ:{{report}}
</template>
<script>
export default {
  async asyncData({ app }) {
    try {
      let [Laboratory, Experiment] = await Promise.all([
        app.$axios.$get('/laboratory/'),
        app.$axios.$get('/experiment/')
      ])
      return {
        laboratory: Laboratory.results,
        experiment: Experiment.results
      }
    } catch ({ response }) {
      console.table(response.data.detail)
    }
  },

  data() {
    return {
      laboratory_id: null,
      experiment_id: null,
      stimul: null,
      sausage: null,
      respondent: null,
      group: null,
      data: null,
      report: null,
      links: [
        {
          name: 'Прошедшие проекты',
          link: 'past_projects'
        },
        {
          name: 'Текущие проекты',
          link: 'current_projects'
        },
        {
          name: 'Начать новый проект',
          link: 'new_project'
        }
      ]
    }
  },
  watch: {
    laboratory_id(val) {
      this.$Message.info(`Выбрана лаборатория ID:${val}`)
      this.experiment_id = null
      this.stimul = null
      this.sausage = null
      this.respondent = null
      this.group = null
      this.data = null
      this.report = null
    },
    experiment_id(val) {
      this.$Message.info(`Выбран эксперимент ID:${val}`)
      this.stimul = null
      this.sausage = null
      this.respondent = null
      this.group = null
      this.data = null
      this.report = null
    }
  },
  computed: {
    experimentByLab() {
      return this.experiment.filter(
        (item) => item.laboratory === this.laboratory_id
      )
    }
  },
  methods: {
    async GET(wtf) {
      const { results } = await this.$axios.$get(
        `/${wtf}/?experiment__laboratory=${this.laboratory_id}&experiment=${this.experiment_id}`
      )
      this[wtf] = results
      this.$Notice.open({
        title: `запрос ${wtf}`,
        desc: 'Успешно'
      })
    }
  }
}
</script>


<style lang="stylus">
.ivu-collapse
  user-select none

.CIRCLE
  background #EEE
  border-radius 50%
  height 120px
  width 120px
  font-size 1.4em
  line-height 1
  padding 2.2em 0 0

.SCROLL
  height 200px
  overflow-y auto
  resize vertical
  background rgba(45, 140, 240, .2)
  padding 1em

.GRID
  display grid
  grid-template-columns 1fr 1fr
  grid-gap 1rem 2rem

  &_item
    overflow auto
</style>