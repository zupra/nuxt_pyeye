<template>
  <section>
    <center>
      <h1>Главная страница</h1>
      <p class="mb-4">Пользователь выбирает работу (3 пути)</p>
      <Button class="mr-3" v-for="It in links" :to="`${It.link}`">{{It.name}}</Button>
    </center>

    <pre>
      {{$data}}
      <!-- laboratory: {{laboratory}} -->
    </pre>
  </section>
</template>
<script>
export default {
  async asyncData({ app }) {
    try {
      let [Laboratory, Experiment, Data] = await Promise.all([
        app.$axios.$get('/proxy/laboratory/'),
        app.$axios.$get('/proxy/experiment/'),
        app.$axios.$get('/proxy/data/?page=2')
        // app.$axios.$get('/proxy/respondent/?page=2')
      ])

      return {
        laboratory: Laboratory,
        experiment: Experiment,
        data: Data
        // respondent: Respondent
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
