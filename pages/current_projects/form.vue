<template lang="pug">
section


  h1.mb-3 Анкеты
  //- pre.pre {{forms}}
  Table#custom_tableForm(
    border
    :loading="loading"
    :columns="columns"
    :data="forms"
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
    title: 'Type',
    key: 'type',
    width: 90,
    align: 'center',
  },
  {
    title: 'Status',
    key: 'status',
    width: 90,
    align: 'center',
  },
  {
    title: 'Описание',
    key: 'description',
  },
  {
    title: 'кол-во вопросов',
    key: 'count_questions',
    // width: 110,
  },
  {
    title: 'кол-во ответов',
    key: 'count_answers',
    // width: 110,
  },
  {
    title: 'Создан',
    key: 'create_time',
    slot: 'create_time',
  },
  // {
  //   title: 'Action',
  //   slot: 'action',
  //   width: 250,
  //   align: 'center',
  // },
]
const pageParams = {
  limit: 10,
  page: 1,
  //
  // laboratory: 1,
  // experiment__laboratory: 1,
  // experiment: 1,
  ordering: 'id',
}
export default {
  components: { expandRow },

  async asyncData({ app, route }) {
    const [forms] = await Promise.all([
      app.$API.form.list({ ...pageParams }, { get: 'form' }),
    ])
    return {
      forms: forms.results,
      pageParams: {
        ...pageParams,
        ...(localStorage.form && JSON.parse(localStorage.form)),
        total: forms.count,
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
      this.pageParams.page = page
      this.UPDATE()
    },
    async UPDATE() {
      this.loading = true

      const { results, count } = await this.$API.form.list(
        {
          ...this.pageParams,
        },
        { set: 'form' }
      )
      this.pageParams.total = count
      this.forms = results
      this.loading = false
    },
  },
}
</script>

<style lang="stylus">
#custom_tableForm .ivu-table-body {
  height: calc(100vh - 320px);
  overflow-y: scroll;
}
</style>
