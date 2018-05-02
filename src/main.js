import Vue from "vue"
import App from "./App.vue"

import axios from "axios"
import store from "./vuex/store"
import router from "./router"

import "./registerServiceWorker"
import "./assets/application.sass"

import AuthenticationService from "./services/authentication"
export default new AuthenticationService({ router: router })

axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  config.headers = {'Authorization': sessionStorage.access_token }

  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})


Object.defineProperty(Vue.prototype, '$http', { value: axios })
Vue.config.productionTip = process.env.VUE_PRODUCTION_TIP === "true"

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app")
