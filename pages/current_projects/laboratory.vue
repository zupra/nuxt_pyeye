<template lang="pug">
section
  pre.pre {{laboratory}}

  Table(
    border
    :columns="columns"
    :data="laboratory"
  )
    template(slot-scope='{ row }', slot='language')
      //- span(v-text="mapLang(row.language)")
      | {{row.language}}
    template(slot-scope='{ row, index }', slot='action')
      Button(
        type='primary'
        size="small"
      ) {{ $t('save') }}


  //- :total='paging_totalCount',
  //- :page-size='pageParams.limit'
  //- :current='pageParams.page', 
  //- @on-change='changePage'
  //- Page(
  //-   show-total
  //- )

</template>

<script>
const columns = [
  {
    title: 'Name',
    key: 'name',
    // width: 100,
  },
  {
    title: 'Language',
    slot: 'language',
  },
  {
    title: 'Action',
    slot: 'action',
    width: 120,
    align: 'center',
  },
]

const pageParams = {
  limit: 5,
  page: 1,
}
export default {
  async asyncData({ app }) {
    const [Laboratory] = await Promise.all([
      // app.$axios.$get('/core/api/laboratory/'),
      app.$API.laboratory.list({ ...pageParams }),
      app.$API.language.list(),
    ])
    return {
      laboratory: Laboratory.results,
    }
  },
  data() {
    return {
      columns,
      pageParams,
    }
  },
  computed: {
    // columns() {
    //   return (
    //     this.laboratory &&
    //     Object.keys(this.laboratory[0]).map((It) => ({ title: It, key: It }))
    //   )
    // },
  },
}
</script>
