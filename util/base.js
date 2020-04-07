class APIconstructor {
  constructor(model, app) {
    this.model = model
    this.app = app
  }

  create(data) {
    console.log('API create ', data)
    return session.post(`/${this.app}/api/${this.model}/`, data)
  }

  list(data = {}) {
    console.log('API list ', data)

    // Параметры в строку. Порно, но пока хз как иначе
    let str = '?'
    for (const [key, value] of Object.entries(data)) {
      str = str + key + '=' + value + '&'
    }
    return session.get(`/${this.app}/api/${this.model}/${str}`)
  }

  get(id) {
    console.log('API get ', id)
    return session.get(`/${this.app}/api/${this.model}/${id}/`)
  }

  update(id, data) {
    console.log('API put ', id, data)
    return session.put(`/${this.app}/api/${this.model}/${id}/`, data)
  }

  delete(data) {
    console.log('API delete ', data)
    return session.delete(`/${this.app}/api/${this.model}/${data.id}/`)
  }
}

export { APIconstructor as default }
