<template lang="pug">
section

  //- pre {{ITEM}}
  
  //- тригер isNewItem/item
  .flex.x_sb.y_start
    .flex.y_base(
      v-if="isNewItem"
    )
      Alert(
        type="success"
        v-if="isNewItem"
      ) {{ $t('add') }} {{ $t('new') }} {{ $t('text') }}
    .flex.y_start(
      v-else
    ) 
      //- new Text
      Button.mr-2(
        type="success"
        @click="ITEM = itemMaker()"
      ) « {{$t('new')}} {{ $t('text') }}
      Alert(
        type="warning"
      )
        | {{ $t('edit') }} mnemonic:
        b {{ITEM[0].mnemonic}}
    //- сбросить тексты
    Button.ml_auto(
      :disabled="!ITEM.some(It => It.text)"
      size="small"
      type="info"
      @click="resetITEM()"
    ) {{ $t('reset') }} {{ $t('text') }}


  //- форма
  .flex.y_end
    div
      .bold Мнемоника
      Input.resize_g(
        placeholder='mnemonic'
        v-model='ITEM[0].mnemonic'
        @on-input-change="mnemonicChange($event)"
      )
    .mx-1(
      v-for="It in ITEM"
    )
      .bold {{mapLang(It.language)}}
      Input.resize_g(
        v-model='It.text'
      )
    //- 
    Button.ml-2(
      :disabled="!(ITEM[0].mnemonic && ITEM.some(It => It.text))"
      :type="isNewItem ? 'success':'warning'"
      @click="isNewItem ? ADD() : PUT()"
    ) 
      //- {{isNewItem ? 'Добавить':'Изменить'}}
      | {{ $t( isNewItem ? 'add':'edit') }}
  .small.mb-2 * {{ $t('required_for_edit_translations') }}

  //- фильтр/сортировка
  Alert.flex.x_center
    .flex.y_center

      //- пока живой поиск
        @on-enter="UPDATE()"
        @on-search="UPDATE()"
      Input.ml-5(
        style="width:300px"
        size="large"
        search
        enter-button
        v-model="keyword"
        
      )
      Button.ml-1(
        :disabled="!keyword"
        type="warning"
        @click="keyword=''"
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
    ) {{ $t('save') }} {{ $t('translations') }}
    
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
  limit: 5,
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
      timeout: null,
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
  /**/

  watch: {
    keyword(newVal, oldVal) {
      // console.log(`Updating from ${oldVal} to ${newVal}`)
      if (newVal || !newVal) {
        // debounce
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          this.pageParams.page = 1
          this.UPDATE()
        }, 1000)
      }
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

    // mnemonic изменилась - обновить список ITEM
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
      // console.log(page)
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
        // TODO договориться о формате ошибок
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
        ...(this.keyword && { search: this.keyword }),
        ordering: 'mnemonic',
        ...this.pageParams,
      })
      this.paging_totalCount = count
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
  height: calc(100vh - 420px);
  overflow-y: scroll;
}

.resize_g {
  resize: horizontal;
  overflow: auto;
}
</style>
