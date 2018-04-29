import Vue from "vue"
import axios from "axios"
import App from "./App.vue"
import store from "./vuex/store"
import router from "./router"

import "./registerServiceWorker"
import "./assets/application.sass"

// import auth0 from "auth0-js"
// console.log(auth0)
// const auth = new auth0.WebAuth({
//   domain: "mrstealth.eu.auth0.com",
//   clientID: "fC4Z1HSO4PHNJTWu9K4Emn90bo6CCgCM",
//   redirectUri: "http://localhost:8080",
//   audience: "https://mrstealth.eu.auth0.com/userinfo",
//   responseType: "token id_token",
//   scope: "openid"
// })
//
// export default auth
import AuthenticationService from "./services/authentication"
const AuthService = new AuthenticationService({ router: router })
export default AuthService

axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  config.headers = {'Authorization': sessionStorage.access_token }

  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})


Object.defineProperty(Vue.prototype, '$auth', { value: AuthService })
Object.defineProperty(Vue.prototype, '$http', { value: axios })


Vue.config.productionTip = process.env.VUE_PRODUCTION_TIP === "true"

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app")
