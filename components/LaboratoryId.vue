<template lang="pug">
div
  //- pre.pre {{laboratory}}
  h3 Выбрать лабораторию 
    span.text_x2 {{laboratory_id}}
  RadioGroup(
    v-model="laboratory_id" type="button"
    @on-change="$emit('laboratory', $event)"
  )
    Radio(
      size="large"
      v-for="(It,idx) in laboratory"
      :label="It.id"
    ) {{It.name}}
  
</template>

<script>
export default {
  data() {
    return {
      laboratory: [],
      laboratory_id: 1,
    }
  },
  async created() {
    const { results } = await this.$axios.$get('/core/api/laboratory/')
    this.laboratory = results
  },
}
</script>

<style></style>
