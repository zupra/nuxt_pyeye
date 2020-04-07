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
        :to='`${It.link}`'
      ) {{ It.name }}
</template>

<script>
const linksCurrentProjects = [
  { name: 'Лаборатории', link: '/current_projects/laboratory' },
  { name: 'Эксперименты', link: '/current_projects/experiment' },
  { name: 'Анкеты', link: '/current_projects/form' },
  { name: 'Стимулы', link: '/current_projects/stimul' },
  { name: 'Визиоряды', link: '/current_projects/sausage' },
  { name: 'Респонденты', link: '/current_projects/respondent' },
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
