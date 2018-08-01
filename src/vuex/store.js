import Vue from "vue"
import Vuex from "vuex"
import actions from "./actions"
import mutations from "./mutations"
import getters from "./getters"
import { getNextBusinessDay } from "../helpers/date"

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    page: "page-2",
    online: navigator.onLine,
    standalone: window.navigator.standalone || window.matchMedia('(display-mode: standalone)').matches,
    orientation: window.screen.width > window.screen.height ? 'landscape' : 'portrait',
    fetching: false,
    loading: false,
    currentDate: getNextBusinessDay(),
    absences: {},
    records: {},
    balance: {},
    debug: false,
    message: null,
    baseUri: process.env.VUE_APP_BASE_URI
  },

  actions,
  mutations,
  getters
})

export default store
