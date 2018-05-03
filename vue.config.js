// import path from "path";
// module.exports = {
//   lintOnSave: true,
//
//   configureWebpack: {
//     name: "vue-work-life-balance",
//     output: {
//       publicPath: "./"
//     },
//
//     resolve: {
//       alias: {
//         "@": path.resolve("src")
//       }
//     }
//   }
//
//   https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
//   pwa: {
//     workboxPluginMode: "InjectManifest",
//     workboxOptions: {
//       swSrc: "src/registerServiceWorker.js"
//     }
//   }
// };

const path = require("path")
module.exports = {
  lintOnSave: true,
  pwa: {
    name: 'My App',
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
