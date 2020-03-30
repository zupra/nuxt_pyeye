<template>
  <div>
    <h1>Начать новый проект</h1>
    <p>Заполняется «паспортичка» проекта.</p>
    <center>
      <p class="mb-3">Пока что «условно» разделим на:</p>

      <N-link class="step mr-3" v-for="(It,idx) in links" :key="idx" :to="`${It.link}`">{{It.name}}</N-link>
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
        },
        {
          name: 'Респонденты',
          link: '/new_project/respondent'
        }
      ]
    }
  }
}
</script>

<style lang="styl">
.step
  color inherit
  font-size: 1.4em
  border: 1px solid #dcdee2
  padding: .3em .7em;
  border-radius .25em

  &.nuxt-link-exact-active
    border-bottom-color: #2d8cf0;
</style>