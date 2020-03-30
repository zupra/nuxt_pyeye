<template lang="pug">
section
  pre {{$data}}
  h3 Выбрать лабораторию 
    span.text_x2 {{laboratory_id}}
  RadioGroup(v-model="laboratory_id" type="button")
    Radio(
      size="large"
      v-for="(It,idx) in laboratory"
      :label="It.id"
    ) {{It.name}}

  h3 TD {{experiment.length}}
  div {{Object.keys(experiment[0])}}
  //-
    div {{TD_experiment}}
    Table(
      :columns="TD_experiment"
      :data="[]"
    )
</template>

<script>
export default {
  async asyncData({ app }) {
    let [Laboratory, Experiment] = await Promise.all([
      app.$axios.$get('/core/api/laboratory/'),
      app.$axios.$get('/core/api/experiment/'),
    ])
    return {
      laboratory: Laboratory.results,
      experiment: Experiment.results,
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
      // анкеты
      forms: null,
      form_resp: null
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
      this.forms = null
      this.form_resp = null
    },
    experiment_id(val) {
      this.$Message.info(`Выбран эксперимент ID:${val}`)
      this.stimul = null
      this.sausage = null
      this.respondent = null
      this.group = null
      this.data = null
      this.report = null
      this.forms = null
      this.form_resp = null
    }
  },
  computed: {
    TD_experiment() {

      return Object.keys(this.experiment[0])
        .map(item => ({title: item, key: item}))
    },
    experimentByLab() {
      return this.experiment.filter(
        (item) => item.laboratory === this.laboratory_id
      )
    }
  },
  methods: {
    async GET(wtf) {
      const { results } = await this.$axios.$get(
        `/core/api/${wtf}/?experiment__laboratory=${this.laboratory_id}&experiment=${this.experiment_id}`
      )
      this[wtf] = results
      this.$Notice.open({
        title: `запрос ${wtf}`,
        desc: 'Успешно'
      })
    },
    async getForm() {
      const { results: forms } = await this.$axios.$get(
        `/forms/api/form/?experiment=${this.experiment_id}&limit=1000&`
      )
      const { data: form_resp } = await this.$axios.$get(
        `/forms/api/form_resp/?experiment=${this.experiment_id}&`
      )
      this.forms = forms
      this.form_resp = form_resp
      this.$Notice.open({
        title: `запрос form`,
        desc: 'Успешно'
      })
    }
  }
}
</script>

<style scoped></style>
