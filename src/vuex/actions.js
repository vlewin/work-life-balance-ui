// export default {
//
//   async getDeployments({ commit, state }, { skip, limit }) {
//       // signal to the views that we are loading data
//    commit(types.PROCESSING_DEPLOYMENTS);
//
//    const results = await deployments.getDeployments(skip, limit);
//
//    if (results) {
//        commit(types.RECEIVED_DEPLOYMENTS, { results, noMoreData: results.length < limit });
//    } else {
//        commit(types.DEPLOYMENTS_FETCH_ERRORS);
//    }
//  }
// }

import Record from "../services/record"

export default {
  navigate: ({ commit }, page) => {
    commit("SET_PAGE", page)
  },

  setCurrentDate: ({ commit }, date) => {
    commit("SET_SELECTED_DAY", date)
  },

  fetchRecords: async ({ commit, state }) => {
    const response = await Record.all({ week: state.currentWeekNumber })
    commit("SET_RECORDS", response.data)
    console.log("fetched")
  },

  saveRecord: async ({ commit }, record) => {
    const response = await Record.save(record)
    // const response = await Record.all({ week: week });
    commit("ADD_RECORD", response.data)
    console.log("saved")
  },

  updateRecord: async ({ commit }, record) => {
    const response = await Record.save(record)
    commit("ADD_RECORD", response.data)
    console.log("saved")
  }
}
