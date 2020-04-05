import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

/*
export default ({ app }) => {
  app.i18n = new VueI18n({
    locale: 'ru',
    fallbackLocale: 'ru',
    messages: {
      ru: require('~/lang/ru.json'),
      en: require('~/lang/en.json'),
    },
  })
}

*/

export default async ({ app, store, $axios, isDev }) => {
  app.i18n = new VueI18n({
    locale: 'ru',
    fallbackLocale: 'ru',
    messages: {
      ru: (await isDev)
        ? require('~/lang/new/ru.json')
        : $axios
            .get('http://pyeye-portal.ru:30003/static/texts/ru.json')
            .then((res) => {
              return res.data
            }),
      en: (await isDev)
        ? require('~/lang/new/en.json')
        : $axios
            .get('http://pyeye-portal.ru:30003/static/texts/en.json')
            .then((res) => {
              return res.data
            }),
    },
  })
}

/*
export default async ({ app }) => {
  app.i18n = new VueI18n({
    // construction a new VueI18n
    locale: 'ru', // store.state.i18n.locale,
    // fallbackLocale: 'ru',
    messages: {
      ru: await fetch('http://193.34.211.46:30003/static/texts/ru.json', {
        mode: 'no-cors',
      }).then((res) => {
        return res.data
      }),
      en: await fetch('http://193.34.211.46:30003/static/texts/en.json', {
        mode: 'no-cors',
      }).then((res) => {
        return res.data
      }),
    },
  })
}

*/
