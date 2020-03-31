<template lang="pug">
section

  h2.center Создать фразу

  //- b {{newItem_langId}}
  Tabs(
    :animated='false',
    type="card"
    @on-click="newItem_langId = $event+1"
  )
    TabPane(
      v-for="lang in LANG"
      :label='lang.code'
    ) 
      Table(
        border 
        :columns="columns_newItem" 
        :data="newItem"
      )
        template(slot-scope='{ row }', slot='mnemonic')
          Input(v-model='row.mnemonic')
        template(slot-scope='{ row }', slot='text')
          Input(v-model='row.text')
        template(slot-scope='{ row, index }', slot='action')
          Button(
            type='primary'
            @click="ADD(row)"
          ) Создать


  .mt-5.mb-3
    h2.center Список фраз
    Input(
      placeholder="фильтр"
      v-model="keyword"
    )
  //- b {{langId}}
  Tabs(
    :animated='false',
    type="card"
    @on-click="langId = $event+1"
  )
    TabPane(
      v-for="lang in LANG"
      :label='lang.code'
    ) 
      Table(
        border 
        :columns="columns" 
        :data="langTable"
      )
        template(slot-scope='{ row }', slot='mnemonic')
          Input(v-model='row.mnemonic')
        template(slot-scope='{ row }', slot='text')
          Input(v-model='row.text')
        template(slot-scope='{ row, index }', slot='action')
          .flex
            Button.mr-1(
              type='primary'
              size="small"
              @click="PUT(row)"
            ) Изменить
            Button(
              type='error'
              size="small"
              @click="DELETE(row.id)"
            ) Удалить


</template>

<script>
class NewItem {
  constructor() {
    this.mnemonic = ''
    this.text = ''
  }
}

const columns_newItem = [
  {
    title: 'Mnemonic',
    slot: 'mnemonic',
  },
  {
    title: 'Text',
    slot: 'text',
  },
  {
    title: 'Action',
    slot: 'action',
    width: 190,
    align: 'center',
  },
]

const columns = [
  {
    title: 'Mnemonic',
    slot: 'mnemonic',
    sortable: true,
  },
  {
    title: 'Text',
    slot: 'text',
    sortable: true,
  },
  {
    title: 'Action',
    slot: 'action',
    width: 190,
    align: 'center',
  },
]

const LANG = [
  { id: 1, code: 'RU' },
  { id: 2, code: 'EN' },
]

export default {
  async asyncData({ app }) {
    const [RuLang, EnLang, Lang] = await Promise.all([
      app.$axios.$get('/core/api/ftext/?language=1'),
      app.$axios.$get('/core/api/ftext/?language=2'),
      app.$axios.$get('/core/api/language/'),
    ])
    return {
      RU: RuLang.results,
      EN: EnLang.results,
      language: Lang.results,
    }
  },

  data() {
    return {
      keyword: '',
      newItem: [new NewItem()],
      newItem_langId: 1,
      langId: 1,
      LANG,
      columns_newItem,
      columns,
      // data: Array.from({ length: 10 }, (v, i) => ({
      //   mnemonic: `mnemonic_${i + 1}`,
      //   text: `TXT_${i + 1}`
      // })),
    }
  },
  computed: {
    langTable() {
      return this.langId === 1 ? this.RU : this.EN
    },
    /**/
    filteredData() {
      return this.data.filter((o) =>
        Object.keys(o).some((k) =>
          o[k].toLowerCase().includes(this.keyword.toLowerCase())
        )
      )
    },
  },
  methods: {
    async ADD(obj) {
      const data = await this.$axios.$post('/core/api/ftext/', {
        ...obj,
        language: this.newItem_langId,
      })

      this.newItem = [new NewItem()] // reset newItem
      this.UPDATE(this.newItem_langId)
      this.$Message.info('Добавлено')
    },
    async UPDATE(lang) {
      const { results } = await this.$axios.$get(
        `/core/api/ftext/?language=${lang}`
      )
      lang === 1 ? (this.RU = results) : (this.EN = results)
    },
    async DELETE(id) {
      const { results } = await this.$axios.$delete(`/core/api/ftext/${id}/`)
      this.UPDATE(this.newItem_langId)
      this.$Message.info('Удалено')
    },
    async PUT(data) {
      const { results } = await this.$axios.$put(
        `/core/api/ftext/${data.id}/`,
        { ...data, language: this.newItem_langId }
      )
      this.UPDATE(this.newItem_langId)
      this.$Message.info('Обновлено')
    },
  },
}
</script>

<style></style>
