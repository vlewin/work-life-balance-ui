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

// const merge = require("webpack-merge")
const path = require("path")
module.exports = {
  // baseUrl: "./",
  lintOnSave: true,
  configureWebpack: {
    module: {
      // rules: [
      //   test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      //   loader: 'url-loader',
      //   options: {
      //     limit: 10000,
      //     name: utils.assetsPath('img/[name].[hash:7].[ext]')
      //   },
      //
      //   // {
      //   test: /\.svg$/,
      //   loader: "url-loader?limit=10000&mimetype=image/svg+xml",
      //   options: {
      //     name: "[name].[ext]"
      //   }
      // }
      // ]
    },
    name: "vue-work-life-balance",
    // output: {
    //   publicPath: "./"
    // },
    resolve: {
      alias: {
        "@": path.resolve("src")
      }
    }
  }
}
