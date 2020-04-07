<template lang="pug">
section

  h1.mb-3 Эксперименты
  Table#custom_tableExperiment(
    border
    :columns="columns"
    :data="experiment"
  )
    template(slot-scope='{ row, index }', slot='create_time')
      span {{ new Date(row.create_time).toLocaleString() }}
    template(slot-scope='{ row, index }', slot='action')
      Button(
        size="small"
      ) Button
      Button.mx-1(
        size="small"
      ) Button
      Button(
        size="small"
      ) Button

    
</template>

<script>
import expandRow from '~/components/Table/table-expand.vue'

const columns = [
  {
    type: 'expand',
    width: 50,
    render: (h, params) => {
      return h(expandRow, {
        props: {
          row: params.row,
        },
      })
    },
  },
  {
    title: 'Name',
    key: 'name',
  },
  {
    title: 'Created',
    slot: 'create_time',
  },
  {
    title: 'Status',
    key: 'status',
    width: 80,
    align: 'center',
  },
  {
    title: 'Type',
    key: 'type',
    width: 80,
    align: 'center',
  },
  {
    title: 'Action',
    slot: 'action',
    width: 250,
    align: 'center',
  },
]

export default {
  components: { expandRow },

  async asyncData({ app }) {
    const [Experiment] = await Promise.all([
      app.$axios.$get('/core/api/experiment/'),
    ])
    return {
      experiment: Experiment.results,
    }
  },
  data() {
    return {
      columns,
    }
  },
  computed: {},
  methods: {},
}
</script>

<style lang="stylus">
#custom_tableExperiment .ivu-table-body {
  height: calc(100vh - 280px);
  overflow-y: scroll;
}
</style>
