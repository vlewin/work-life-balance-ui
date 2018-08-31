import Vue from "vue"

export default {
  SET_ONLINE(state, condition) {
    console.log("SET_ONLINE")
    state.online = condition
  },

  SET_ORIENTATION(state, condition) {
    console.log("SET_ORIENTATION")
    state.orientation = condition
  },

  SET_MESSAGE(state, message) {
    console.log("SET_MESSAGE")
    state.message = message
    setTimeout(() => {
      state.message = null
    }, 10000)
  },

  SET_LOADING(state, condition) {
    console.log("SET_LOADING")
    if (condition) {
      state.loading = condition
    } else {
      setTimeout(() => {
        state.loading = condition
      }, 500)
    }
  },

  SET_FETCHING(state, condition) {
    console.log("SET_FETCHING")
    if (condition) {
      state.fetching = condition
    } else {
      setTimeout(() => {
        state.fetching = condition
      }, 500)
    }
  },

  SET_PAGE(state, page) {
    console.log("SET_PAGE")
    Vue.set(state, "page", page)
  },

  SET_SELECTED_DAY(state, date) {
    console.log("SET_SELECTED_DAY")
    Vue.set(state, "currentDate", date)
  },

  SET_BALANCE(state, balance) {
    console.log("SET_RECORDS")
    Vue.set(state, "balance", balance)
  },

  SET_RECORDS(state, records) {
    console.log("SET_RECORDS")
    const data = {}
    records.forEach(item => (data[item.date] = item))
    Vue.set(state, "records", data)
  },

  ADD_RECORD(state, record) {
    console.log("ADD_RECORD")
    Vue.set(state.records, record.date, record)
  },

  DELETE_RECORD(state, record) {
    console.log("DELETE_RECORD")
    Vue.delete(state.records, record.date)
  },

  SET_ABSENCES(state, absences) {
    console.log("SET_ABSENCES")
    const data = {}
    absences.forEach(item => (data[item.date] = item))
    Vue.set(state, "absences", data)
  },

  ADD_ABSENCE(state, record) {
    console.log("ADD_ABSENCE")
    Vue.set(state.records, record.date, record)
  }
}
