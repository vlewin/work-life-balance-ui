import Vue from "vue";

export default {
  SET_PAGE(state, page) {
    Vue.set(state, "page", page);
  },

  SET_SELECTED_DAY(state, date) {
    Vue.set(state, "currentDate", date);
  },

  SET_RECORDS(state, records) {
    Vue.set(state, "records", records);
  }
};
