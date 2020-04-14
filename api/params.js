export class APIparams {
  constructor(params, KEY) {
    this.params = params
    this.KEY = KEY
  }

  setParams() {
    localStorage.setItem(KEY, params)
  }

  getParams() {
    localStorage.getItem(KEY)
  }

  delParams() {
    localStorage.removeItem(KEY)
  }
}
