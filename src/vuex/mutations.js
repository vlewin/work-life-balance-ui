import Vue from 'vue'

export default {
  SET_PAGE(state, page) {
    Vue.set(state, 'page', page)
  },

  SET_SELECTED_DAY(state, date) {
    Vue.set(state, 'selectedDay', date)
  }
}
