import Vue from 'vue'

export default {
  SET_PAGE(state, page) {
    Vue.set(state, 'page', page)
  }
}
