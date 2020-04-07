import Vue from 'vue'
import VueI18n from 'vue-i18n'

// const path = require('path')

Vue.use(VueI18n)

/*
export default ({ app }) => {
  app.i18n = new VueI18n({
    locale: 'ru',
    fallbackLocale: 'ru',
    messages: {
      ru: require('~/lang/new/ru.json'),
      en: require('~/lang/new/en.json'),
      // path.resolve(rootDir, 'ru.json')
      // ru: require('/static/texts/ru.json'),
      // en: require('~/static/texts/en.json'),
    },
  })
}
*/

/**/
export default async ({ app, store, $axios }) => {
  app.i18n = new VueI18n({
    locale: 'ru',
    fallbackLocale: 'ru',
    messages: {
      ru: await $axios.$get('/static/texts/ru.json').then((res) => {
        return res
      }),
      en: await $axios.$get('/static/texts/en.json').then((res) => {
        return res
      }),
    },
  })
}
