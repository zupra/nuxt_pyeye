<template lang="pug">
section

  h1.mb-3 Респонденты
  //- pre.pre {{respondent}}
  pre {experiment__laboratory: 1,experiment: 1}
  Table#custom_tableExperiment(
    border
    size="small"
    :loading="loading"
    :columns="columns"
    :data="respondent"
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
// const expandRow = () =>('./my-async-component')
// const expandRow = () => import('~/components/Table/table-expand.vue')

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
  },
  {
    title: 'first_name',
    key: 'first_name',
    sortable: 'custom',
  },

  {
    title: 'surname',
    key: 'surname',
    sortable: 'custom',
  },
  {
    title: 'Отчество',
    key: 'patronymic',
    sortable: 'custom',
  },
  {
    title: 'Пол',
    key: 'sex',
    width: 64,
  },
  {
    title: 'Эксперимент',
    key: 'experiment_name',
  },
  {
    title: 'Визиоряд',
    key: 'sausage_name',
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
    width: 90,
    align: 'center',
  },
]
const pageParams = {
  limit: 5,
  page: 1,
  // total: 0,
  // laboratory: 1,
  experiment__laboratory: 1,
  experiment: 1,
  ordering: 'id',
}
export default {
  components: { expandRow },

  async asyncData({ app }) {
    const [respondent] = await Promise.all([
      app.$API.respondent.list({ ...pageParams }),
    ])
    return {
      respondent: respondent.results,
      pageParams: { ...pageParams, total: respondent.count },
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

      const { results, count } = await this.$API.respondent.list({
        ...this.pageParams,
      })
      this.pageParams.total = count
      this.respondent = results
      this.loading = false
    },
  },
}
</script>

<style lang="stylus">
#custom_tableExperiment .ivu-table-body {
  height: calc(100vh - 320px);
  overflow-y: scroll;
}
</style>
