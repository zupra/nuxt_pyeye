import Vue from 'vue'
import VueI18n from 'vue-i18n'

// Tell Vue to use our plugin
Vue.use(VueI18n)

// import Vue from 'vue'
// import VueI18n from 'vue-i18n'
// Vue.use(VueI18n)

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
