export default {
  mode: 'spa',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: '#26a69a',
    height: '5px'
  },
  /*
   ** Global CSS
   */
  css: [
    'iview/dist/styles/iview.css',
    { src: '~assets/main.styl', lang: 'stylus' }
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '@/plugins/iview',
    '~/plugins/axios'
    // {src: '~/plugins/full-calendar.js', ssr: false}
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    // '@nuxtjs/eslint-module'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // '@nuxtjs/auth',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv'
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */

  /**
  
  SessionAuthentication with Nuxt and Django-Rest-Framework
  https://stackoverflow.com/questions/57059548/how-to-use-sessionauthentication-with-nuxt-and-django-rest-frameworkhttps://stackoverflow.com/questions/57059548/how-to-use-sessionauthentication-with-nuxt-and-django-rest-framework
  
  */

  axios: {
    withCredentials: true,
    baseURL: process.env.API_URL || 'http://193.34.211.46:30003/core/api/' // 'http://10.0.20.29/core/api/' //"http://pyeye.ru/core/api" // "http://127.0.0.1/core/api/" "http://192.168.1.165/core/api/"
    // proxyHeaders: true,
    // proxy: true,
    // baseURL: process.env.NODE_ENV !== "production" ? "1" : "2"
  },

  /*
  proxy: {
    '/proxy/': {
      target: '193.34.211.46:30003', //'http://moslab.neurotrend.ru/core/api/',
      pathRewrite: {'^/proxy/': ''},
      changeOrigin: true
      // prependPath: false
    }
  },
  */

  /*
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            url: '/login/',
            method: 'post',
            propertyName: 'token'
          },
          user: false,
          logout: false
        },
        tokenType: 'Token'
        // tokenName: 'Authorization'
      }
    }
  },
  */

  /*
   ** Build configuration
   */
  build: {
    filenames: {
      app: ({ isDev }) => (isDev ? '[name].js' : 'js/[contenthash].js'),
      chunk: ({ isDev }) => (isDev ? '[name].js' : 'js/[contenthash].js'),
      css: ({ isDev }) => (isDev ? '[name].css' : 'css/[contenthash].css')
      // img: ({ isDev }) => isDev ? '[path][name].[ext]' : 'img/[contenthash:7].[ext]',
      // font: ({ isDev }) => isDev ? '[path][name].[ext]' : 'fonts/[contenthash:7].[ext]',
      // video: ({ isDev }) => isDev ? '[path][name].[ext]' : 'videos/[contenthash:7].[ext]'
    },

    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
}
