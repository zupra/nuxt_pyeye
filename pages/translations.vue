<template lang="pug">
section

  //- pre compile_texts:{{compile_texts}}


  h2 Создать фразу
  Table(
    border 
    :columns="columns" 
    :data="newItem"
  )
    template(slot-scope='{ row }', slot='name')
      Input(v-model='row.name')
    template(slot-scope='{ row }', slot='ru')
      Input(v-model='row.ru')
    template(slot-scope='{ row }', slot='en')
      Input(v-model='row.en')
    template(slot-scope='{ row, index }', slot='action')
      Button(type='primary') Создать
    table(border='', :columns='columns', :data='newItem')

  .mt-4.mb-3
    h2 Список фраз
    Input(
      placeholder="фильтр"
      v-model="keyword"
    )
  Table(
    border 
    :columns="columns" 
    :data="filteredData"
  )
    template(slot-scope='{ row }', slot='name')
      Input(v-model='row.name')
    template(slot-scope='{ row }', slot='ru')
      Input(v-model='row.ru')
    template(slot-scope='{ row }', slot='en')
      Input(v-model='row.en')
    template(slot-scope='{ row, index }', slot='action')
      Button(type='primary') Сохранить


</template>

<script>
export default {
  async asyncData({ app }) {
    let [Text, TextList] = await Promise.all([
      app.$axios.$get('/core/api/compile_texts/'),
      app.$axios.$get('/core/api/ftext/'),
    ])
    return {
      compile_texts: Text,
      ftext: TextList.results,
    }
  },

  data() {
    return {
      keyword: '',
      columns: [
        {
          title: 'Мнемоника',
          slot: 'name',
        },
        {
          title: 'RU',
          slot: 'ru',
        },
        {
          title: 'EN',
          slot: 'en',
        },
        {
          title: 'Action',
          slot: 'action',
          width: 150,
          align: 'center',
        },
      ],
      newItem: [
        {
          mnemonic: '',
          ru: '',
          en: '',
        },
      ],
      data: Array.from({ length: 33 }, (v, i) => ({
        name: `name_${i + 1}`,
        ru: `RU_${i + 1}`,
        en: `EN_${i + 1}`,
      })),
    }
  },
  computed: {
    filteredData() {
      return this.data.filter((o) =>
        Object.keys(o).some((k) =>
          o[k].toLowerCase().includes(this.keyword.toLowerCase())
        )
      )
    },
  },
  methods: {},
}
</script>

<style></style>
