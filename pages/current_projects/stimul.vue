<template lang="pug">
section
    pre {{stimul}}
</template>

<script>
export default {
  async asyncData({ app }) {
    const [Stimul] = await Promise.all([
      app.$axios.$get('/core/api/stimul/?experiment=1'),
    ])
    return {
      stimul: Stimul,
    }
  },
  data() {
    return {}
  },
}
</script>
