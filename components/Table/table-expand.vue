<template lang="pug">
//- pre.pre {{row}}
.GRID
  .GRID_item(
    v-for="(V,K) in row"
  )
    //- template(
    //-   v-if="typeof K !== 'object'"
    //- )
    b {{K}}
    i(
      v-if="K === 'video_file'"
    ) : LINK video_file
    span(
      v-else
    ) : {{V}}
    //- pre.pre(
    //-   v-if="K == 'product_type'"
    //- ) {{row.K}}
  
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
