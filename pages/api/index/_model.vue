<template lang="pug">
section
  h1.center {{ $route.params.model }} API(list)
  pre {{ $data }}
</template>

<script>
// import expandRow from '~/components/Table/table-expand.vue'

export default {
  // validate ({ params }) {},
  asyncData({ app, params }) {
    const data = app.$API[params.model].list()
    return data
  },
  data() {
    return {}
  },
}
</script>

<style scoped>
pre {
  height: calc(100vh - 260px);
  text-align: initial;
}
</style>
