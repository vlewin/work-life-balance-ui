import Record from "../services/record"

export default {
  online: async ({ commit }, condition) => {
    commit("SET_ONLINE", condition)
  },

  navigate: ({ commit }, page) => {
    commit("SET_PAGE", page)
  },

  setCurrentDate: ({ commit }, date) => {
    commit("SET_SELECTED_DAY", date)
  },

  setLoading: ({ commit }) => {
    commit("SET_LOADING", true)
  },

  resetLoading: ({ commit }) => {
    setTimeout(() => {
      commit("SET_LOADING", false)
    }, 500)
  },

  fetchMonthRecords: async ({ commit }, month) => {
    commit("SET_FETCHING", true)
    const response = await Record.all({ month: month })
    commit("SET_RECORDS", response.data)
    commit("SET_FETCHING", false)
    console.log("fetched")
  },

  fetchRecords: async ({ commit, getters }) => {
    commit("SET_FETCHING", true)
    const response = await Record.all({ week: getters.currentWeekNumber })
    commit("SET_RECORDS", response.data)
    commit("SET_FETCHING", false)
    console.log("fetched")
  },

  saveRecord: async ({ commit }, record) => {
    commit("SET_LOADING", true)
    const response = await Record.save(record)
    // const response = await Record.all({ week: week });
    commit("ADD_RECORD", response.data)
    commit("SET_LOADING", false)
    console.log("saved")
  },

  saveAbsence: async ({ commit }, records, reason) => {
    commit("SET_LOADING", true)
    const response = await Record.save(records, reason)
    // const response = await Record.all({ week: week });
    commit("ADD_RECORD", response.data)
    commit("SET_LOADING", false)
    console.log("saved")
  },

  updateRecord: async ({ commit }, record) => {
    const response = await Record.save(record)
    commit("ADD_RECORD", response.data)
    console.log("saved")
  }
}
