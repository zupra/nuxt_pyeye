<template lang="pug">
section

  center
    div(
       style="width: 40em;"
    )
      Button(
        v-for="(It, idx) in linksCurrentProjects"
        :key="idx"
        class="m-1"
        shape="circle"
        :to='`/current_projects/${It.model}`'
      ) {{ It.name }}
    
    NuxtChild
</template>

<script>
const linksCurrentProjects = [
  { name: 'Лаборатории', model: 'laboratory' },
  { name: 'Эксперименты', model: 'experiment' },
  { name: 'Стимулы', model: 'stimul' },
  { name: 'Визиоряды', model: 'sausage' },
  { name: 'Респонденты', model: 'respondent' },
  { name: 'Анкеты', model: 'form' },
  // { name: 'Группы', link: '/current_projects/group' },
  // { name: 'Данные', link: '/current_projects/data' },
  // { name: 'Отчеты', link: '/current_projects/report' },
  // { name: 'Зоны интереса', link: '/current_projects/zoneinterest' },
  // { name: 'Графики', link: '/current_projects/charts' },
]

export default {
  async asyncData({ app }) {
    const [Laboratory] = await Promise.all([
      app.$axios.$get('/core/api/laboratory/'),
    ])
    return {
      laboratory: Laboratory.results,
    }
  },
  data() {
    return {
      linksCurrentProjects,
    }
  },
}
</script>
