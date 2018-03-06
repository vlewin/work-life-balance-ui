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
    fetching: false,
    loading: false,
    currentDate: getNextBusinessDay(),
    records: {},
    debug: false
  },

  actions,
  mutations,
  getters
})

export default store
