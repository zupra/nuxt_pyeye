export default {
  mode: 'universal',
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
  css: ['iview/dist/styles/iview.css', { src: '~assets/main.styl', lang: 'stylus' }],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['@/plugins/iview'],
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
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv'
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    withCredentials: true,
    baseURL: process.env.API_URL || "http://pyeye.ru/core/api" // "http://127.0.0.1/core/api/" "http://192.168.1.165/core/api/" 
  },


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
        }
      }
    }
  },

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
}
