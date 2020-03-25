import VuexPersistence from 'vuex-persist'

export default ({ store }) => {
  window.onNuxtReady(() => {
    new VuexPersistence({
      // options
      key: 'user',
      modules: ['user'],
      storage: localStorage
    }).plugin(store);
  });
}