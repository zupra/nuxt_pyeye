export const state = () => ({
  token: sessionStorage.getItem('user-token') || ''
})

export const mutations = {
  LOGIN(state, token) {
    sessionStorage.setItem('user-token', token)
    state.token = token
  },
  LOGOUT(state) {
    sessionStorage['user-token'] = ''
    state.token = ''
  }
}

export const actions = {
  async login({ commit }, User) {
    try {
      const { token } = await this.$axios.$post(
        '/login/',
        User
        // {
        //   params: { ...User }
        // }
      )

      // const data = await this.$axios.$get('/laboratory/')

      commit('LOGIN', token)
      this.$router.push('/')
    } catch ({ response }) {
      alert(response.data.message)
    }
  }
}
