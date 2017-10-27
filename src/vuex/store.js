import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    page: 'page-2',
    debug: false
  },

  actions,
  mutations,
  getters
})

export default store
