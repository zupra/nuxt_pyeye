<template lang="pug">
section

  //- pre {{Lang}}
  //- pre {{newItem}}

  Collapse.mb-4
    Panel()
      | Добавить
      div(slot='content')
        .flex
          .mb-3
            .bold Мнемоника
            Input(
              v-model='mnemonic'
            )
        
        .flex.y_end
          div
            .bold RU
            Input(
              v-model='text_RU'
            )
          Button.ml-1(
            :disabled="!(mnemonic && text_RU)"
            type='primary'
            @click="ADD(text_RU, 1)"
          ) + RU

        .flex.y_end
          div
            .bold EN
            Input(
              v-model='text_EN'
            )
          Button.ml-1(
            :disabled="!(mnemonic && text_EN)"
            type='primary'
            @click="ADD(text_EN, 2)"
          ) + EN


  //- pre {{Text}}
  //- NEED_COUPLE

  template(
    v-for="(V,K) in Text"
  )
    Table(
      border 
      :columns="columns" 
      :data="V"
    )
      template(slot-scope='{ row }', slot='language')
        span(v-text="mapLang(row.language)")
      template(slot-scope='{ row }', slot='text')
        Input(v-model='row.text')
      template(slot-scope='{ row, index }', slot='action')
        Button.mr-1(
          type='primary'
          size="small"
          @click="PUT(row)"
        ) Сохранить


</template>

<script>
class NewItem {
  constructor() {
    this.mnemonic = '123'
    this.text_RU = '123'
    this.text_EN = '123'
  }
}

export default {
  async asyncData({ app }) {
    const [Text, Lang] = await Promise.all([
      app.$axios.$get('/core/api/ftext/'),
      app.$axios.$get('/core/api/language/'),
    ])

    const groupBy = (arr, key) =>
      arr
        .map((val) => val[key])
        .reduce((acc, val, i) => {
          acc[val] = (acc[val] || []).concat(arr[i])
          return acc
        }, {})

    return {
      // Text: Text.results,
      Text: groupBy(Text.results, 'mnemonic'),
      Lang: Lang.results,
    }
  },

  data() {
    return {
      // keyword: '',
      mnemonic: '',
      text_RU: '',
      text_EN: '',
      newItem: new NewItem(),
      // ========
      columns: [
        {
          title: 'Мнемоника',
          key: 'mnemonic',
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
          width: 150,
          align: 'center',
        },
      ],
    }
  },
  computed: {},
  methods: {
    mapLang(id) {
      const map = {
        1: 'Русский',
        2: 'English',
      }
      return map[id]
    },
    async ADD(text, language) {
      try {
        await this.$axios.$post('/core/api/ftext/', {
          mnemonic: this.mnemonic,
          text,
          language,
        })
        this.UPDATE()
        this.$Message.info('Добавлено')
      } catch (e) {}
    },
    UPDATE() {
      // const { results } = await this.$axios.$get(`/core/api/ftext/}`)
      // const groupBy = (arr, key) =>
      //   arr
      //     .map((val) => val[key])
      //     .reduce((acc, val, i) => {
      //       acc[val] = (acc[val] || []).concat(arr[i])
      //       return acc
      //     }, {})

      // this.Text = groupBy(results, 'mnemonic')
      location.reload()
    },
    // async DELETE(id) {
    //   const { results } = await this.$axios.$delete(`/core/api/ftext/${id}/`)
    //   this.UPDATE(this.newItem_langId)
    //   this.$Message.info('Удалено')
    // },

    async PUT(data) {
      await this.$axios.$put(`/core/api/ftext/${data.id}/`, data)
      // this.UPDATE()
      this.$Message.info('Обновлено')
    },
  },
}
</script>

<style></style>
