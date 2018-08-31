import Vue from "vue"
import App from "./App.vue"

import axios from "axios"
import store from "./vuex/store"
import router from "./router"

import appsyncProvider from './vue-apollo'


// import "./registerServiceWorker"
import "./assets/application.sass"

import AuthenticationService from "./services/authentication"
const AuthService = new AuthenticationService({ router: router })

window.AuthService = AuthService
export default AuthService

axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  config.headers = { 'Authorization': localStorage.access_token }

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
  provide: appsyncProvider.provide(),
  render: h => h(App)
}).$mount("#app")
