<template lang="pug">
section

  .flex
    div
      LaboratoryId(
        @laboratory="changeParams($event)"
      )
      h1.mb-3 Визиоряды
    pre.ml-5 pageParams:{{pageParams}}

  Table#custom_tableSausage(
    border
    :loading="loading"
    :columns="columns"
    :data="sausage"
    @on-sort-change="changeSort($event)"
  )
    template(slot-scope='{ row, index }', slot='create_time')
      span {{ new Date(row.create_time).toLocaleString() }}
    template(slot-scope='{ row, index }', slot='update_time')
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
import expandRow from '~/components/Table/table-expand.vue'
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
    title: 'Эксперимент',
    key: 'experiment_name',
  },
  {
    title: 'status',
    key: 'status',
  },

  {
    title: 'Создан',
    key: 'create_time',
    slot: 'create_time',
  },
  {
    title: 'Обновлен',
    key: 'update_time',
    slot: 'update_time',
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

  // laboratory: 1,
  experiment__laboratory: 1,
  // experiment: 1,
  ordering: 'id',
}
export default {
  components: { expandRow, LaboratoryId },

  async asyncData({ app, route }) {
    const [sausage] = await Promise.all([
      app.$API.sausage.list({ ...pageParams }, { get: 'sausage' }),
    ])
    return {
      sausage: sausage.results,
      pageParams: {
        ...pageParams,
        ...(localStorage.sausage && JSON.parse(localStorage.sausage)),
        total: sausage.count,
      },
    }
  },
  data() {
    return {
      loading: false,
      columns,
    }
  },
  computed: {},
  methods: {
    changeParams(event) {
      this.pageParams = {
        ...this.pageParams,
        page: 1,
        experiment__laboratory: event,
      }
      this.UPDATE()
    },
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

      const { results, count } = await this.$API.sausage.list(
        {
          ...this.pageParams,
        },
        { set: 'sausage' }
      )
      this.pageParams.total = count
      this.sausage = results
      this.loading = false
    },
  },
}
</script>

<style lang="stylus">
#custom_tableSausage .ivu-table-body {
  height: calc(100vh - 400px);
  overflow-y: scroll;
}
</style>
