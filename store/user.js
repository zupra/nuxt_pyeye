export const state = () => ({
  token: '',
})

export const mutations = {
  logIn(state, token) {
    state.token = token
  },
  logOut(state) {
    state.token = ''
  }
}