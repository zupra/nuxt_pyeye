const env = require('dotenv').config()
console.log(env)

const isDev = process.env.NODE_ENV !== 'production'
console.log('isDev', isDev)

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
    height: '6px'
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
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv'
  ],
  /*
   ** Axios module configuration
   Doc https://axios.nuxtjs.org/options
   https://github.com/klesarev/axios-rus-docs/tree/master/docs
   */
  axios: {
    withCredentials: true,
    baseURL: process.env.API_URL,
    browserBaseURL: isDev && 'http://localhost:3000/proxy/',
    proxy: isDev
    /**
        requestInterceptor: (config, { store }) => {
          if (store.state.auth.token) {
            config.headers.common.authorization = `Token ${store.state.auth
              .token}`;
          }
          return config;
        },
        responseInterceptor: (response, ctx) => {
          // global.console.log(ctx);
          return response;
        }
    */
  },

  /**/
  proxy: {
    '/proxy/': {
      target: process.env.API_URL,
      pathRewrite: { '^/proxy/': '' },
      changeOrigin: true,
      proxyHeaders: true
      // prependPath: false
    }
  },

  /**/
  auth: {
    fetchUserOnLogin: true,
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
        tokenType: 'Token',
        tokenName: 'Authorization'
      }
    }
    // redirect: {
    //   login: '/login',
    //   home: '/'
    // }
  },

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
