// Authorization
export default function({ $axios, store }) {
  $axios.onRequest((config) => {
    if (store.state.user.token) {
      config.headers.common['Authorization'] = `Token ${store.state.user.token}`
      config.xsrfCookieName = 'csrftoken'
      config.xsrfHeaderName = 'X-CSRFToken'
    }
  })
}

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
