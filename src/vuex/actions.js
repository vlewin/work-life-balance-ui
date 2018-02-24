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

import Record from "../services/record";

export default {
  navigate: ({ commit }, page) => {
    commit("SET_PAGE", page);
  },

  setCurrentDate: ({ commit }, date) => {
    commit("SET_SELECTED_DAY", date);
  },

  fetchRecords: ({ commit }, week) => {
    console.log("ACTIONS: fetchRecords", week);
    Record.all({ week: week })
      .then(response => {
        commit("SET_RECORDS", response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  // async fetchWeek({ commit }, week) {
  //   console.log(commit, week);
  //   const response = await Record.all();
  //   commit("SET_SELECTED_DAY", response.data);
  // }
};
