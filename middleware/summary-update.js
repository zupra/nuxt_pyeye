// https://nuxtjs.org/api/context

/*
  const {
    app,
    store,
    route,
    params,
    query,
    env,
    isDev,
    isHMR,
    redirect,
    error
  } = context

*/

export default function ({ store }) {
  return store.dispatch('summary/get') // && location.reload()
}
