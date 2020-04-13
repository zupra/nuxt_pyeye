<template lang="pug">
section


  .flex
    div
      LaboratoryId(
        @laboratory="pageParams.experiment__laboratory = $event;UPDATE()"
      )
      h1.mb-3 Стимулы
    pre.ml-5 {{pageParams}}

  //- pre.pre {{stimul}}
  Table#custom_tableStimul(
    border
    :loading="loading"
    :columns="columns"
    :data="stimul"
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
    title: 'Длина, мс',
    key: 'length',
    sortable: 'custom',
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
  // total: 0,
  // laboratory: 1,

  // experiment__laboratory: 1,
  // experiment: 1,
  ordering: 'id',
}
export default {
  components: {
    expandRow,
    LaboratoryId,
  },

  async asyncData({ app }) {
    const [stimul] = await Promise.all([
      app.$API.stimul.list({ ...pageParams }),
    ])
    // const { product_type, ...rest } = stimul.results
    // stimul.results.map(({ product_type, ...rest }) => ({ ...rest })),
    return {
      stimul: stimul.results,
      pageParams: { ...pageParams, total: stimul.count },
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

      const { results, count } = await this.$API.stimul.list({
        // ...(this.keyword && { search: this.keyword }),
        // ordering: 'mnemonic',
        // laboratory: 1,
        ...this.pageParams,
      })
      this.pageParams.total = count
      this.stimul = results
      this.loading = false
    },
  },
}
</script>

<style lang="stylus">
#custom_tableStimul .ivu-table-body {
  height: calc(100vh - 400px);
  overflow-y: scroll;
}
</style>
