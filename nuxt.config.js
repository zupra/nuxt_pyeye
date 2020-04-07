const env = require('dotenv').config()
console.log(env)

const isDev = process.env.NODE_ENV !== 'production'
console.log('isDev', isDev)

export default {
  mode: 'spa', // 'universal',

  env: {
    APP_VERSION: +new Date(),
    /*
    API_URL:
      process.env.NODE_ENV === 'dev'
        ? 'http://193.34.211.46:30003/'
        : 'http://pyeye-portal.ru:30003/',
    */
  },
  // Content-Security-Policy
  // https://stackoverflow.com/questions/34852682/refused-to-load-the-script-because-it-violates-the-following-content-security-po
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
        content: process.env.npm_package_description || '',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: '#26a69a',
    height: '6px',
  },
  /*
   ** Global CSS
   */
  css: [
    'iview/dist/styles/iview.css',
    { src: '~assets/main.styl', lang: 'stylus' },
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '@/plugins/iview',
    '~/plugins/axios',
    '~/plugins/i18n',
    '~/plugins/vuex-persist',
    '~/plugins/repository',
    // {src: '~/plugins/full-calendar.js', ssr: false}
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    // '@nuxtjs/eslint-module',
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/axios',
    // https://dev.auth.nuxtjs.org/
    '@nuxtjs/auth',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    // 'nuxt-i18n',
  ],

  /*
  i18n: {
    locales: [
      {
        name: 'Russian',
        code: 'ru',
        iso: 'ru-RU',
        // file: 'ru.json',
      },
      {
        name: 'English',
        code: 'en',
        iso: 'en-US',
        // file: 'en.json',
      },
    ],
    lazy: true,
    // langDir: '/lang/',
  },
  */

  /*
   ** Axios module configuration
   Doc https://axios.nuxtjs.org/options
   https://github.com/klesarev/axios-rus-docs/tree/master/docs
   */
  axios: {
    withCredentials: true,
    baseURL: process.env.API_URL,
    browserBaseURL: isDev && 'http://localhost:3000/proxy/',
    proxy: isDev,
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
      proxyHeaders: true,
    },
  },

  /**/
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            url: '/core/api/login/',
            method: 'post',
            propertyName: 'token',
          },
          user: false,
          logout: {
            url: '/core/api/logout/',
            method: 'post',
          },
        },
        tokenType: 'Token',
        tokenName: 'Authorization',
        tokenRequired: false,
      },
    },
  },

  /*
   ** Build configuration
   */
  build: {
    /*
    filenames: {
      app: ({ isDev }) => (isDev ? '[name].js' : 'js/[contenthash].js'),
      chunk: ({ isDev }) => (isDev ? '[name].js' : 'js/[contenthash].js'),
      css: ({ isDev }) => (isDev ? '[name].css' : 'css/[contenthash].css'),
      // img: ({ isDev }) => isDev ? '[path][name].[ext]' : 'img/[contenthash:7].[ext]',
      // font: ({ isDev }) => isDev ? '[path][name].[ext]' : 'fonts/[contenthash:7].[ext]',
      // video: ({ isDev }) => isDev ? '[path][name].[ext]' : 'videos/[contenthash:7].[ext]'
    },
    */

    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {},
  },
}
