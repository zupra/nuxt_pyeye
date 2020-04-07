<template lang="pug">
section


  //- pre {{ITEM}}
  
  .flex.x_sb
    //- тригер isNewItem/item
    .text_x2.bold(
      v-if="isNewItem"
    ) {{ $t('new') }} {{ $t('text') }}
    .text_x2.flex(
      v-else
    ) 
      Button.mr-2(
        size="small"
        type="success"
        @click="ITEM = itemMaker()"
      ) {{$t('new')}} {{ $t('text') }}
      | mnemonic:
      b {{ITEM[0].mnemonic}}

    //- 
    Button.ml_auto(
      :disabled="!ITEM.some(It => It.text)"
      size="small"
      type="info"
      @click="resetITEM()"
    ) {{ $t('reset') }} {{ $t('text') }}
  
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
    ) 
      //- {{isNewItem ? 'Добавить':'Изменить'}}
      | {{ $t( isNewItem ? 'add':'edit') }}
      //- span(
      //-   v-if="isNewItem"
      //- ) {{ $t('add') }}
      //- span(
      //-   v-else
      //- ) {{ $t('edit') }}


  //- фильтр/сортировка
  .my-1
    h3.center {{ $t('list_of_phrases') }}
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
      
      //- enter-button
      Input.mx-1(
        placeholder="больше 2 букв, + можно по enter"
        search
        v-model="keyword"
        @on-enter="CHANGE()"
      )
      Button(
        :disabled="keyword.length < 2"
        type='primary'
        @click="CHANGE()"
      ) {{ $t('search') }}
      Button.ml-1(
         :disabled="!keyword"
        type="warning"
        @click="UPDATE()"
      ) {{$t('reset')}} {{ $t('search') }}







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
      ) {{ $t('save') }}

  .flex.y_center.x_sb.m-3

    Button(
      type='primary'
      @click="compile_texts()"
    ) {{ $t('save') }} {{ $t('list_of_phrases') }}
    

    Page(
      show-total
      :total='paging_totalCount',
      :page-size='pageParams.limit'
      :current='pageParams.page', 
      @on-change='changePage'
    )



</template>

<script>
const columns = [
  {
    title: 'Мнемоника',
    key: 'mnemonic',
    width: 140,
    // sortable: true,
  },
  {
    title: 'Язык',
    slot: 'language',
    width: 100,
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
const pageParams = {
  limit: 100,
  page: 1,
}
export default {
  async asyncData({ app }) {
    const [Text, Lang] = await Promise.all([
      app.$API.ftext.list({ ...pageParams }),
      app.$API.language.list(),
    ])
    return {
      Text: Text.results,
      paging_totalCount: Text.count,
      Lang: Lang.results,
    }
  },

  data() {
    return {
      loading: false,
      keyword: '',
      ITEM: null,
      columns,
      pageParams,
      paging_totalCount: 0,
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
    resetITEM() {
      for (const It of this.ITEM) {
        It.text = ''
      }
    },
    changePage(page) {
      console.log(page)
      this.pageParams.page = page
      this.UPDATE()
    },
    // rowClassName(row, index) {},

    async compile_texts() {
      await this.$API.compile_texts.list()
      this.$Message.info('Обновлено')
    },
    async get_ITEM(mnemonic) {
      const { results } = await this.$API.ftext.list({ mnemonic })
      // если не было всех языков - добавляем
      const arrA = this.Lang.map((It) => It.id)
      const arrB = results.map((It) => It.language)
      const needLangId = arrA.filter((x) => !arrB.includes(x))
      const Res = needLangId.map((It) => ({
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
          It.text && (await this.$API.ftext.create(It))
        }
        // this.$Message.info('Добавлено')
        this.UPDATE()
      } catch ({ response }) {
        // console.dir(response)
        this.$Message.error(JSON.stringify(response.data))
      }
    },

    async PUT(payload) {
      try {
        if (payload) {
          await this.$API.ftext.update(payload.id, payload)
        } else {
          for (const It of this.ITEM) {
            // старые $put'им, новые $post'им
            It.id && (await this.$API.ftext.update(It.id, It))
            !It.id && It.text && (await this.$API.ftext.create(It))
          }
        }
        this.$Message.info('Обновлено')
        this.UPDATE()
      } catch ({ response }) {
        // console.dir(response)
        // TODO договориться о формате ошибок
        this.$Message.error(JSON.stringify(response.data))
      }
    },

    async UPDATE() {
      this.ITEM = this.itemMaker()
      this.loading = true

      const { results, count } = await this.$API.ftext.list({
        ...this.pageParams,
        ordering: 'mnemonic',
      })
      // this.keyword = ''
      this.paging_totalCount = count
      this.Text = results
      this.loading = false
    },

    async CHANGE() {
      this.loading = true

      const { results } = await this.$API.ftext.list({
        search: this.keyword,
        ordering: 'mnemonic',
      })

      this.Text = results
      this.loading = false
    },

    /*
    async DEL() {
      for (const It of this.ITEM) {
        this.$API.ftext.delete(It.id)
      }
      this.$Message.info('Удалено')
      this.UPDATE()
    },
    */
  },
}
</script>

<style lang="stylus">
#custom_Table .ivu-table-body {
  height: calc(100vh - 370px);
  overflow-y: scroll;
}
</style>
