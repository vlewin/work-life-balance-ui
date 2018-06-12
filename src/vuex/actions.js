import Absence from "../services/absence"
import Record from "../services/record"
import Balance from "../services/balance"

export default {
  online: async ({ commit }, condition) => {
    commit("SET_ONLINE", condition)
  },

  navigate: ({ commit }, page) => {
    commit("SET_PAGE", page)
  },

  setDateAndFetch: async ({ commit, state, dispatch, getters }, date) => {
    console.log('**** setDateAndFetch', date)
    await dispatch("fetchMonthRecords", date.getMonth() + 1)

    commit("SET_SELECTED_DAY", date)
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

  fetchBalance: async ({ commit }, userId) => {
    console.log('*** fetchBalance', userId)
    const response = await Balance.get('github|611466')

    console.log('*** Action - fetchBalance - response', response.data)
    commit("SET_BALANCE", response.data)
  },

  fetchMonthRecords: async ({ commit, getters }, month) => {
    console.log('**** fetchMonthRecords', month)

    if(month !== getters.currentMonthNumber) {
      console.log('Fetch records for month:', month,  getters.currentMonthNumber)

      commit("SET_FETCHING", true)
      const response = await Record.all({ month: month || getters.currentMonthNumber })
      commit("SET_RECORDS", response.data)
      commit("SET_FETCHING", false)
    } else {
      console.log('Records for month:', month, 'aleady cached!')
    }
  },

  fetchRecords: async ({ commit, getters }) => {
    console.log('*** fetchRecords')

    commit("SET_FETCHING", true)
    const response = await Record.all({ week: getters.currentWeekNumber })
    commit("SET_RECORDS", response.data)
    commit("SET_FETCHING", false)
  },

  updateRecord: async ({ commit }, record) => {
    const response = await Record.save(record)
    commit("ADD_RECORD", response.data)
    console.log("saved")
  },

  saveRecord: async ({ commit }, record) => {
    commit("SET_LOADING", true)
    const response = await Record.save(record)
    console.log('Response data', response.data)
    commit("ADD_RECORD", response.data)
    commit("SET_LOADING", false)
    console.log("saved")
  },

  deleteRecord: async ({ commit }, record) => {
    commit("SET_LOADING", true)
    await Record.delete(record)
    // FIXME: Remove record from store
    commit("DELETE_RECORD", record)
    commit("SET_LOADING", false)
    console.log("removed")
  },

  fetchMonthAbsences: async ({ commit }, month) => {
    commit("SET_FETCHING", true)
    const response = await Absence.all({ month: month })
    commit("SET_ABSENCES", response.data)
    commit("SET_FETCHING", false)
  },

  saveAbsence: async ({ commit }, records, reason) => {
    commit("SET_LOADING", true)
    const response = await Absence.save(records, reason)
    commit("ADD_ABSENCE", response.data)
    commit("SET_LOADING", false)
  }
}
