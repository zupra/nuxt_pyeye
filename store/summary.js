export const state = () => ({
  summary: null
})

export const mutations = {
  SET_SUMMARY(state, summary) {
    state.summary = summary
  }
}

export const actions = {
  async get({ commit }) {
    try {
      const data = await this.$axios.$get('/core/api/summary/')
      commit('SET_SUMMARY', data)
    } catch ({ response }) {
      console.table(response.data)
    }
  }
}
