export default ($axios) => (model, app = 'core') => ({
  list(data = undefined, storeKey = undefined) {
    /**
     * { get: 'model' } / { set: 'model' }
     */
    // SET
    if (storeKey && storeKey.set) {
      const { total, ...param } = data
      localStorage.setItem(`${storeKey.set}`, JSON.stringify(param))
    }
    // GET
    if (storeKey && storeKey.get && localStorage[storeKey.get]) {
      data = JSON.parse(localStorage[storeKey.get])
    }

    return $axios.$get(`/${app}/api/${model}/`, {
      params: data,
    })
  },

  get(id) {
    return $axios.$get(`/${app}/api/${model}/${id}/`)
  },

  create(payload) {
    return $axios.$post(`/${app}/api/${model}/`, payload)
  },

  update(id, payload) {
    return $axios.$put(`/${app}/api/${model}/${id}/`, payload)
  },

  delete(id) {
    return $axios.$delete(`/${app}/api/${model}/${id}/`)
  },
})
