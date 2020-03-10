<template>
  <div>
    <h1>Начать новый проект</h1>
    <p>Заполняется «паспортичка» проекта.</p>
    <center>
      <p>Для порядка «условно» разделим на:</p>

      <N-link class="step mr-3" v-for="It in links" :to="`${It.link}`">{{It.name}}</N-link>
    </center>

    <Divider />
  </div>
</template>


<script>
export default {
  data() {
    return {
      links: [
        {
          name: 'Основное',
          link: '/new_project'
        },
        {
          name: 'Стимулы',
          link: '/new_project/stimulus'
        },
        {
          name: 'Целевая аудитория',
          link: '/new_project/targetPeople'
        },
        {
          name: 'Лаборатория',
          link: '/new_project/laboratory'
        }
      ]
    }
  }
}
</script>

<style lang="styl">
.step
  font-size: 1.4em;
.nuxt-link-exact-active
  font-weight: bold;
</style>