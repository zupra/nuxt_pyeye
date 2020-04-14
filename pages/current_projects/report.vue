<template lang="pug">
section
    pre {experiment:1}
    pre {{report}}
</template>

<script>
export default {
  async asyncData({ app }) {
    const [Report] = await Promise.all([
      app.$axios.$get('/core/api/report/?experiment=1'),
    ])
    return {
      report: Report,
    }
  },
  data() {
    return {}
  },
}
</script>
