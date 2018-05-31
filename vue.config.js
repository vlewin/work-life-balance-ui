const path = require("path")

module.exports = {
  lintOnSave: true,
  pwa: {
    name: 'WORK-LIFE-BALANCE',
    themeColor: '#4DBA87',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    // configure the workbox plugin
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: "src/registerServiceWorker.js"
    }
  },

  configureWebpack: {
    name: "vue-work-life-balance",
    devtool: "source-map",

    resolve: {
      alias: {
        '@': path.resolve('src'),
        'vue$': 'vue/dist/vue.esm.js'
      }
    }
  }
}
