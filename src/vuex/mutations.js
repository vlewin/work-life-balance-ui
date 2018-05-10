import Vue from "vue"

export default {
  SET_ONLINE(state, condition) {
    state.online = condition
  },

  SET_LOADING(state, condition) {
    if (condition) {
      state.loading = condition
    } else {
      setTimeout(() => {
        state.loading = condition
      }, 500)
    }
  },

  SET_FETCHING(state, condition) {
    if (condition) {
      state.fetching = condition
    } else {
      setTimeout(() => {
        state.fetching = condition
      }, 500)
    }
  },

  SET_PAGE(state, page) {
    Vue.set(state, "page", page)
  },

  SET_SELECTED_DAY(state, date) {
    Vue.set(state, "currentDate", date)
  },

  SET_BALANCE(state, balance) {
    Vue.set(state, "balance", balance)
  },

  SET_RECORDS(state, records) {
    const data = {}
    records.forEach(item => (data[item.date] = item))
    state.records = data

    // state.records = Object.assign({}, state.records, data)
    console.log(state.records)
    // Vue.set(state, "records", records.map(record => ({ key: record.date, val: record })));
  },

  ADD_RECORD(state, record) {
    console.log("ADD_RECORD")
    Vue.set(state.records, record.date, record)
  }
}
