<template lang="pug">
section
    pre {{respondent}}
</template>

<script>
export default {
  async asyncData({ app }) {
    const [Respondent] = await Promise.all([
      app.$axios.$get('/core/api/respondent/?experiment=1'),
    ])
    return {
      respondent: Respondent,
    }
  },
  data() {
    return {}
  },
}
</script>
