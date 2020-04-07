export default ($axios) => (model, app = 'core') => ({
  list(data = {}) {
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
