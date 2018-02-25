import Vue from "vue"
import App from "./App.vue"
import store from "./vuex/store"
import router from "./router"

import "./registerServiceWorker"
import "./assets/application.sass"

console.log(process.env)
Vue.config.productionTip = process.env.VUE_PRODUCTION_TIP === "true"

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app")
