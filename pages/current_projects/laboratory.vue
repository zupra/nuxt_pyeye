<template lang="pug">
section
  //- pre {{laboratory}}
  Table(
    border
    :columns="columns"
    :data="laboratory"
  )
</template>

<script>
export default {
  async asyncData({ app }) {
    const [Laboratory] = await Promise.all([
      app.$axios.$get('/core/api/laboratory/'),
    ])
    return {
      laboratory: Laboratory.results,
    }
  },
  // data() {
  //   return {}
  // },
  computed: {
    columns() {
      return (
        this.laboratory &&
        Object.keys(this.laboratory[0]).map((It) => ({ title: It, key: It }))
      )
    },
  },
}
</script>
