export default function ({ $axios, redirect, app, store }) {
  // Django CSRF configuration
  $axios.onRequest((config) => {
    config.xsrfCookieName = 'csrftoken'
    config.xsrfHeaderName = 'X-CSRFToken'
  })

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
      // break

      // default:
      //   error({
      //     statusCode,
      //     message,
      //   })
    }
  })
}
