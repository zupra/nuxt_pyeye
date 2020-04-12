<template lang="pug">
section
    pre.pre {{group}}
</template>

<script>
export default {
  async asyncData({ app }) {
    const [Group] = await Promise.all([
      app.$axios.$get('/core/api/group/?experiment=1'),
    ])
    return {
      group: Group,
    }
  },
  data() {
    return {}
  },
}
</script>
