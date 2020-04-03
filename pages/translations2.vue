<template lang="pug">
section


  //- pre {{ITEM}}

  //- тригер isNewItem/item
  .text_x2(
    v-if="isNewItem"
  ) НОВАЯ ЗАПИСЬ
  .text_x2.flex(
    v-else
  ) 
    Button.mr-2(
      size="small"
      type="success"
      @click="ITEM = itemMaker()"
    ) Новая запись
    | mnemonic:
    b {{ITEM[0].mnemonic}}
    Button.ml_auto(
      size="small"
      type="error"
      @click="DEL()"
    ) Del all mnemonic item
  
  //- форма
  .flex.mb-2.y_end
    .m-1
      b Мнемоника
      Input(
        placeholder='mnemonic'
        v-model='ITEM[0].mnemonic'
        @on-input-change="mnemonicChange($event)"
      )
    .m-1(
      v-for="It in ITEM"
    )
      b {{mapLang(It.language)}}
      Input(
        v-model='It.text'
      )
    //- 
    Button.m-1(
      :disabled="!(ITEM[0].mnemonic && ITEM.some(It => It.text))"
      :type="isNewItem ? 'success':'warning'"
      @click="isNewItem ? ADD() : PUT()"
    ) {{isNewItem ? 'Добавить':'Изменить'}}


  //- фильтр/сортировка
  .my-1
    h3.center Список фраз
    .flex
      Dropdown
        Button 
          | sort by: &nbsp;
          icon(type='ios-arrow-down')
        DropdownMenu(
          slot='list'
        )
          DropdownItem(
            v-for="It in ['text','language','mnemonic']"
            @click.native="UPDATE(It)"
          ) {{It}}
      Input.mx-1(
        placeholder="фильтр"
        v-model="keyword"
        @on-enter="CHANGE()"
      )
      Button(
        :disabled="keyword.length < 2"
        type='primary'
        @click="CHANGE()"
      ) Поиск
      Button.ml-1(
         :disabled="!keyword"
        type="warning"
        @click="UPDATE(); keyword = ''"
      ) сбросить Поиск

  //- Table
  Table#custom_Table(
    border
    :loading="loading"
    :columns="columns" 
    :data="Text"
    @on-row-click="get_ITEM($event.mnemonic)"
  )
    template(slot-scope='{ row }', slot='language')
      span(v-text="mapLang(row.language)")
    template(slot-scope='{ row }', slot='text')
      Input(v-model='row.text')
    template(slot-scope='{ row, index }', slot='action')
      Button(
        type='primary'
        size="small"
        @click.stop="PUT(row)"
      ) Сохранить


</template>

<script>
const columns = [
  {
    title: 'Мнемоника',
    key: 'mnemonic',
    // sortable: true,
  },
  {
    title: 'Язык',
    slot: 'language',
  },
  {
    title: 'Значение',
    slot: 'text',
  },
  {
    title: 'Action',
    slot: 'action',
    width: 120,
    align: 'center',
  },
]

export default {
  async asyncData({ app }) {
    const [Text, Lang] = await Promise.all([
      app.$axios.$get('/core/api/ftext/?ordering=mnemonic'),
      app.$axios.$get('/core/api/language/'),
    ])
    return {
      Text: Text.results,
      Lang: Lang.results,
    }
  },

  data() {
    return {
      loading: false,
      keyword: '',
      ITEM: null,
      columns,
    }
  },
  computed: {
    isNewItem() {
      return !this.ITEM[0].id
    },
    _mapLang() {
      return this.Lang.reduce((map, obj) => {
        map[obj.id] = obj.name
        return map
      }, {})
    },
  },
  created() {
    this.ITEM = this.itemMaker()
  },

  methods: {
    mapLang(id) {
      return this._mapLang[id]
    },
    itemMaker() {
      return this.Lang.map((It) => ({
        language: It.id,
        mnemonic: '',
        text: '',
      }))
    },
    mnemonicChange(e) {
      // console.log(e.target.value)
      const val = e.target.value
      this.ITEM.forEach((It) => (It.mnemonic = val))
    },
    async get_ITEM(mnemonic) {
      const { results } = await this.$axios.$get(
        `/core/api/ftext/?mnemonic=${mnemonic}`
      )
      // если не было всех языков - добавляем
      let arrA = this.Lang.map((It) => It.id)
      let arrB = results.map((It) => It.language)
      let needLangId = arrA.filter((x) => !arrB.includes(x))
      let Res = needLangId.map((It) => ({
        language: It,
        mnemonic,
        text: '',
      }))
      this.ITEM = [...results, ...Res]
    },

    async ADD() {
      try {
        for (const It of this.ITEM) {
          // только те что с текстом
          It.text && (await this.$axios.$post('/core/api/ftext/', It))
        }
        // this.$Message.info('Добавлено')
        this.UPDATE()
      } catch ({ response }) {
        console.dir(response)
        // this.$Message.error('Что-то пошло не так (:')
        // {"non_field_errors":["The fields mnemonic, language must make a unique set."]}
        this.$Message.error(JSON.stringify(response.data))

      }
    },

    async PUT(payload) {
      if (payload) {
        await this.$axios.$put(`/core/api/ftext/${payload.id}/`, payload)
      } else {
        for (const It of this.ITEM) {
          // старые $put'им, новые $post'им
          It.id && (await this.$axios.$put(`/core/api/ftext/${It.id}/`, It))
          !It.id && It.text && (await this.$axios.$post('/core/api/ftext/', It))
        }
      }
      this.$Message.info('Обновлено')
      this.UPDATE()
    },

    async UPDATE(by = 'mnemonic') {
      this.ITEM = this.itemMaker()
      this.loading = true
      const { results } = await this.$axios.$get(
        `/core/api/ftext/?ordering=${by}`
      )
      this.keyword = ''
      this.Text = results
      this.loading = false
    },

    async CHANGE(by = 'mnemonic') {
      this.loading = true
      const { results } = await this.$axios.$get(
        `/core/api/ftext/?search=${this.keyword}&ordering=${by}`
      )
      this.Text = results
      this.loading = false
    },

    async DEL() {
      for (const It of this.ITEM) {
        await this.$axios.$delete(`/core/api/ftext/${It.id}/`)
      }
      this.$Message.info('Удалено')
      this.UPDATE()
    },
  },
}
</script>

<style lang="stylus">
#custom_Table .ivu-table-body
  height calc(100vh - 340px)
  overflow-y scroll
</style>
