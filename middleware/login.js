export default function ({ store, redirect }) {
  if (!store.state.user.data.token) {
    return redirect('/login')
  }
}
