<template lang="pug">
section

  pre {{$route.path}}

  .flex
    div
      LaboratoryId(
        @laboratory="pageParams.laboratory = $event;UPDATE()"
      )
      h1.mb-3 Эксперименты
    pre.ml-5 {{pageParams}}

  Table#__custom_tableExperiment(
    border
    :loading="loading"
    :columns="columns"
    :data="experiment"
    @on-sort-change="changeSort($event)"
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

  Page.mt-4(
    show-total
    :total='pageParams.total',
    :page-size='pageParams.limit'
    :current='pageParams.page', 
    @on-change='changePage'
  )
    
</template>

<script>
// https://vueschool.io/articles/vuejs-tutorials/lazy-loading-and-code-splitting-in-vue-js/
import expandRow from '~/components/Table/table-expand.vue'
// const expandRow = () =>('./my-async-component')
// const expandRow = () => import('~/components/Table/table-expand.vue')

import LaboratoryId from '~/components/LaboratoryId.vue'

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
    title: 'Id',
    key: 'id',
    sortable: 'custom',
    width: 70,
    align: 'center',
  },
  {
    title: 'Name',
    key: 'name',
    sortable: 'custom',
  },
  {
    title: 'Created',
    key: 'create_time',
    slot: 'create_time',
    sortable: 'custom',
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
const pageParams = {
  limit: 10,
  page: 1,
  // total: 0,
  //
  laboratory: 1,
  ordering: 'id',
}
export default {
  components: {
    expandRow,
    LaboratoryId,
  },

  async asyncData({ app }) {
    const [Experiment] = await Promise.all([
      app.$API.experiment.list({ ...pageParams }),
    ])
    return {
      experiment: Experiment.results,
      pageParams: { ...pageParams, total: Experiment.count },
    }
  },
  data() {
    return {
      loading: false,
      columns,
      // pageParams,
    }
  },
  computed: {},
  methods: {
    changeSort(obj) {
      // normal asc desc
      const by =
        obj.order === 'asc'
          ? `-${obj.key}`
          : obj.order === 'desc'
          ? `${obj.key}`
          : 'id'
      this.pageParams = { ...this.pageParams, ...(by && { ordering: by }) }
      this.UPDATE()
    },
    changePage(page) {
      // console.log(page)
      this.pageParams.page = page
      this.UPDATE()
    },
    async UPDATE() {
      this.loading = true

      const { results, count } = await this.$API.experiment.list({
        // ...(this.keyword && { search: this.keyword }),
        // ordering: 'mnemonic',
        // laboratory: 1,
        ...this.pageParams,
      })
      this.pageParams.total = count
      this.experiment = results
      this.loading = false
    },
  },
}
</script>

<style lang="stylus">
#__custom_tableExperiment .ivu-table-body {
  height: calc(100vh - 400px);
  overflow-y: scroll;
}
</style>
