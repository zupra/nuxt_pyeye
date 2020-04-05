export const state = () => ({
  // token: sessionStorage.getItem('user-token') || '',
  // token: '',
  data: {},
})

export const mutations = {
  USER_DATA(state, data) {
    /*
    const { token, ...rest } = data
    state.token = token // Object.assign({}, data) // { superuser, staff, user_id, username, language_id }
    state.data = rest
    */
    state.data = data
  },
  /*
  LOGIN(state, token) {
    sessionStorage.setItem('user-token', token)
    state.token = token
  },
  */
  LOGOUT(state) {
    // sessionStorage['user-token'] = ''
    state.data.token = ''
  },
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

      // const data = await this.$axios.$get('/core/api/laboratory/')

      commit('LOGIN', token)
      this.$router.push('/')
    } catch ({ response }) {
      alert(response.data.message)
    }
  },
}
