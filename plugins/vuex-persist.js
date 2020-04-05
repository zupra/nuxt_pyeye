import VuexPersistence from 'vuex-persist'

export default ({ store }) => {
  window.onNuxtReady(() => {
    new VuexPersistence({
      // options
      key: 'user',
      modules: ['auth'],
      storage: sessionStorage,
    }).plugin(store)
  })
}
