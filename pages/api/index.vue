<template lang="pug">
section

  .flex_wr
    NuxtLink.linkModel(
      v-for="(It, idx) in linksCurrentProjects"
      :key="idx"
      :to='`/api/${It.model}`'
    ) {{ It.name }}
  
  NuxtChild(
    :key="$route.params.model" 
  )
</template>

<script>
const linksCurrentProjects = [
  { name: 'Лаборатории', model: 'laboratory' },
  { name: 'Эксперименты', model: 'experiment' },
  { name: 'Респонденты', model: 'respondent' },
  { name: 'Визиоряды', model: 'sausage' },
  { name: 'Стимулы', model: 'stimul' },
  { name: 'Анкеты', model: 'form' },
  { name: 'Группы', model: 'group' },
  { name: 'Данные', model: 'data' },
  { name: 'Отчеты', model: 'report' },

  { name: 'ftext', model: 'ftext' },
  { name: 'compile_texts', model: 'compile_texts' },
  { name: 'language', model: 'language' },
  { name: 'owner', model: 'owner' },
  { name: 'device', model: 'device' },
  { name: 'summary', model: 'summary' },
  { name: 'update_exp_stat', model: 'update_exp_stat' },
  { name: 'episode', model: 'episode' },
  { name: 'sausage_stimuls', model: 'sausage_stimuls' },
  { name: 'sausage_stimuls_pack', model: 'sausage_stimuls_pack' },
  { name: 'stimul_episodes', model: 'stimul_episodes' },
  { name: 'stimul_duplicate', model: 'stimul_duplicate' },
  { name: 'collect_groups', model: 'collect_groups' },
  { name: 'downloads', model: 'downloads' },
  { name: 'zone', model: 'zone' },
  { name: 'aggregate', model: 'aggregate' },
  { name: 'zone_metric_calc', model: 'zone_metric_calc' },
  { name: 'groupquestion', model: 'groupquestion' },
  { name: 'question', model: 'question' },
  { name: 'answers', model: 'answers' },
  { name: 'form_resp', model: 'form_resp' },
  { name: 'form_copy', model: 'form_copy' },
  { name: 'answer_api', model: 'answer_api' },
  { name: 'ext_answer_api', model: 'ext_answer_api' },
]

export default {
  data() {
    return {
      linksCurrentProjects,
    }
  },
}
</script>

<style lang="stylus" scoped>
.linkModel {
  font-size: 1rem;
  margin: 2px;
  color: #333;
  border: 1px solid #CCC;
  padding: 0 0.7em;
  border-radius: 1em;

  &:hover {
    background: #f7f7f7;
    border-color: #2d8cf0;
  }

  &.nuxt-link-exact-active {
    border-color: #2d8cf0;
    background: #2d8cf0;
    color: #FFF;
  }
}
</style>
