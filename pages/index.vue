<template>
  <section>
    <Button class="mr-3" v-for="It in links" :to="`${It.link}`">{{It.name}}</Button>

    <br />

    <pre>
    {{$data}}
  </pre>
    <pre>
    {{allApi}}
  </pre>
  </section>
</template>
<script>
export default {
  async asyncData({ app }) {
    try {
      let [Laboratory, Experiment, Data, Respondent] = await Promise.all([
        // this.$axios.$get('/'),
        app.$axios.$get('/proxy/laboratory/'),
        app.$axios.$get('/proxy/experiment/'),
        app.$axios.$get('/proxy/data/'),
        app.$axios.$get('/proxy/respondent/')
      ])

      return {
        laboratory: Laboratory,
        experiment: Experiment,
        data: Data,
        respondent: Respondent
      }

    } catch ({ response }) {
      // console.table(response.data.detail)
      this.$Message.error({
        content: response.data.detail,
        duration: 10,
        closable: true
      })
    }
  },

  data() {
    return {
      allApi: null,
      labs: null,

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
  }
}
</script>
