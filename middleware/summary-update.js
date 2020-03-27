export default function({ store, route, redirect }) {
  return store.dispatch('summary/get')
}
