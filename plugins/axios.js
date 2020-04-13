export default function ({ $axios, redirect, app, store }) {
  // Django CSRF configuration
  $axios.onRequest((config) => {
    config.xsrfCookieName = 'csrftoken'
    config.xsrfHeaderName = 'X-CSRFToken'

    // console.dir(config)
    // config.url
    console.dir(app.router)
    if (config.params) {
      console.log(config.url, config.params)
      localStorage.setItem(`${config.url}`, JSON.stringify(config.params))

      /*
      if (localStorage.getItem(`${config.url}`)) {
        config.params = {
          ...JSON.parse(localStorage[config.url]),
          // ...config.params,
        }
        // getItem(`${config.url}`)
      } else {
        localStorage.setItem(`${config.url}`, JSON.stringify(config.params))
        // .slice(0, -1)
      }
      */

      // app.$storage.remember(`${config.url}`, () => {
      //   // Делаем HTTP-запросы или другие асинхронные вещи
      //   console.log('111123213')
      // })
    }
  })

  // app.router.currentRoute

  // $axios.onError((error) => {
  //   const code = parseInt(error.response && error.response.status)
  //   if (code === 401 || code === 403) {
  //     // app.$auth.logout()
  //     redirect('/login')
  //     // return error.response
  //   }
  // })

  $axios.onError(({ response }) => {
    const statusCode = response.status
    // const message = response.data.message

    switch (statusCode) {
      case 401:
      case 403:
        redirect('/login')
      // app.$auth.logout()
    }
  })
}
