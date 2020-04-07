<template lang="pug">
//- pre {{row}}
.GRID
  .GRID_item(
    v-for="(V,K) in row"
  )
    b {{K}}
    span : {{V}}
  
</template>

<script>
export default {
  props: {
    row: Object,
  },
}
</script>

<style lang="stylus">
.GRID {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 0.5rem 1.2rem;

  &_item {
    // overflow: auto;
    border-bottom: 1px dotted #CCC;
  }
}
</style>
