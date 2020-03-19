<template>
  <div>
    <Button class="mr-3" v-for="It in links" :to="`${It.link}`">{{It.name}}</Button>
  </div>
</template>
<script>
export default {
  async created() {
    try {
      let [Dog] = await Promise.all([this.$axios.$get('/laboratory/')])
      return {
        rows: Dog.results
        // trustee: Trustee.results.map(({ id, fio }) => ({ id, fio }))
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
