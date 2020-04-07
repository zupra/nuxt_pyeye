<template lang="pug">
section
    pre {{sausage}}
</template>

<script>
export default {
  async asyncData({ app }) {
    const [Sausage] = await Promise.all([
      app.$axios.$get('/core/api/sausage/?experiment=1'),
    ])
    return {
      sausage: Sausage,
    }
  },
  data() {
    return {}
  },
}
</script>
