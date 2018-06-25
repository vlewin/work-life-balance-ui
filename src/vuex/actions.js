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

  setMessage: ({ commit }, message) => {
    commit("SET_MESSAGE", message)
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

  fetchBalance: async ({ commit, getters }) => {
    console.log('*** fetchBalance')

    const response = await Balance.get(getters.currentUserId).catch((error) => {
      if(error.response.status) {
        commit("SET_MESSAGE", error.message)
      }
    })

    console.log('*** Action - fetchBalance - response', response.data)
    commit("SET_BALANCE", response.data)
  },

  fetchMonthRecords: async ({ commit, getters }, month) => {
    console.log('**** fetchMonthRecords', month)

    if(month !== getters.currentMonthNumber) {
      console.log('Fetch records for month:', month,  getters.currentMonthNumber)
      commit("SET_FETCHING", true)

      const response = await Record.all({ month: month || getters.currentMonthNumber }).catch((error) => {
        if(error.response.status) {
          commit("SET_MESSAGE", error.message)
        }
      })

      commit("SET_RECORDS", response.data)
      commit("SET_FETCHING", false)
    } else {
      console.log('Records for month:', month, 'aleady cached!')
    }
  },

  fetchRecords: async ({ commit, getters }) => {
    commit("SET_FETCHING", true)
    const response = await Record.all({ week: getters.currentWeekNumber }).catch((error) => {
      if(error.response.status) {
        commit("SET_MESSAGE", error.message)
      }
    })

    commit("SET_RECORDS", response.data)
    commit("SET_FETCHING", false)
  },

  updateRecord: async ({ commit }, record) => {
    commit("SET_LOADING", true)

    const response = await Record.save(record).catch((error) => {
      if(error.response.status) {
        commit("SET_MESSAGE", error.message)
      }
    })

    commit("ADD_RECORD", response.data)
  },

  saveRecord: async ({ commit }, record) => {
    commit("SET_LOADING", true)

    const response = await Record.save(record).catch((error) => {
      if(error.response.status) {
        commit("SET_MESSAGE", error.message)
      }
    })

    commit("ADD_RECORD", response.data)
    commit("SET_LOADING", false)
  },

  deleteRecord: async ({ commit }, record) => {
    commit("SET_LOADING", true)

    await Record.delete(record).catch((error) => {
      if(error.response.status) {
        commit("SET_MESSAGE", error.message)
      }
    })

    commit("DELETE_RECORD", record)
    commit("SET_LOADING", false)
    console.log("removed")
  },

  fetchMonthAbsences: async ({ commit }, month) => {
    commit("SET_FETCHING", true)

    const response = await Absence.all({ month: month }).catch((error) => {
      if(error.response.status) {
        commit("SET_MESSAGE", error.message)
      }
    })

    commit("SET_ABSENCES", response.data)
    commit("SET_FETCHING", false)
  },

  saveAbsence: async ({ commit, dispatch }, records, reason) => {
    commit("SET_LOADING", true)

    await Absence.save(records, reason).catch((error) => {
      if(error.response.status) {
        commit("SET_MESSAGE", error.message)
      }
    })

    await dispatch('fetchMonthRecords')
    commit("SET_LOADING", false)

    setTimeout(async () => {
      await dispatch('fetchBalance')
    }, 2000)
  },

  deleteAbsence: async ({ commit, dispatch }, records) => {
    commit("SET_LOADING", true)

    await Record.delete(records).catch((error) => {
      if(error.response.status) {
        commit("SET_MESSAGE", error.message)
      }
    })

    await dispatch('fetchMonthRecords')
    commit("SET_LOADING", false)

    setTimeout(async () => {
      await dispatch('fetchBalance')
    }, 2000)
  }
}
