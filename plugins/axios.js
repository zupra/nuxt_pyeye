export default function ({ $axios, redirect, app, store }) {
  // Django CSRF configuration
  $axios.onRequest((config) => {
    config.xsrfCookieName = 'csrftoken'
    config.xsrfHeaderName = 'X-CSRFToken'
  })

  $axios.onError((error) => {
    const code = parseInt(error.response && error.response.status)
    if (code === 401 || code === 403) {
      redirect('/login')
      // app.$auth.logout()
      // store.commit('user/LOGOUT') // store.state.user.token = ''
    }
  })

  /*
  $axios.onError(({ response }) => {
    const statusCode = response.status
    const message = response.data.message

    switch (statusCode) {
      case 401:
      case 403:
        redirect('/login')
        app.$auth.logout()
        break

      default:
        error({
          statusCode,
          message,
        })
    }
  })
  */
}

// Authorization
/*
export default function({ $axios, store }) {
  $axios.onRequest((config) => {
    if (store.state.user.token) {
      config.headers.common['Authorization'] = `Token ${store.state.user.token}`
      config.xsrfCookieName = 'csrftoken'
      config.xsrfHeaderName = 'X-CSRFToken'
    }
  })
}
*/

/*
export default function ({ $axios }) {
  $axios.defaults.xsrfCookieName = 'csrftoken'
  $axios.defaults.xsrfHeaderName = 'X-CSRFToken'
}

export default function ({ $axios, redirect }) {
  $axios.onRequest((config) => {
    console.log('Making request to ' + config.url)
  })

  $axios.onError((error) => {
    const code = parseInt(error.response && error.response.status)
    if (code === 400) {
      redirect('/400')
    }
  })
}
*/
