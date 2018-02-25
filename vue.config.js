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
const path = require("path");
module.exports = {
  baseUrl: "./",
  configureWebpack: {
    devtool: "inline-source-map",
    name: "vue-work-life-balance",
    output: {
      publicPath: "./"
    },
    resolve: {
      alias: {
        "@": path.resolve("src")
      }
    }
  }
  // css: {
  //   // Enable CSS source maps.
  //   sourceMap: true,
  //   // Enable CSS modules for all CSS/pre-processor files.
  //   // This option does not affect *.vue files.
  //   modules: true
  // },
  // Split dependencies into their own bundle.
  // https://github.com/vuejs/vue-cli/blob/dev/docs/cli-service.md#dll-mode
  // dll: true
};
