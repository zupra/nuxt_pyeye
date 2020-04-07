<template lang="pug">
section

    pre {{form}}
</template>

<script>
export default {
  async asyncData({ app }) {
    const [Form] = await Promise.all([
      app.$axios.$get('/forms/api/form_resp/?experiment=1'),
    ])
    return {
      form: Form,
    }
  },
  data() {
    return {}
  },
}
</script>
