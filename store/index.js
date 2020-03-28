/*
export const state = () => ({
  env: {},
})

export const mutations = {
  setEnv(state, env) {
    state.env = env
  },
}

export const actions = {
  nuxtServerInit({ commit }) {
    if (process.server) {
      commit('setEnv', {
        VAR1: process.env.APP_VERSION,
        VAR2: process.env.ENV_VAR_TWO || 'default value',
      })
    }
  },
}
*/
