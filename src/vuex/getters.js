import getISOWeek from "date-fns/get_iso_week"

export default {
  // findRecordByDate(state) {
  //   return date =>
  //     state.records.find(record => {
  //       return record.date === date;
  //     });
  // },

  currentFomatedDate(state) {
    return state.currentDate.toLocaleDateString()
  },

  currentWeekNumber(state) {
    return getISOWeek(new Date(state.currentDate))
  },

  currentMonthNumber(state) {
    return new Date(state.currentDate).getMonth() + 1
  },


  currentRecord(state) {
    return state.records[state.currentDate.toLocaleDateString("de-DE")]

    // return state.records.find(record => {
    //   console.log(record.date, format(state.currentDate, "DD.MM.YYYY"));
    //   return record.date === format(state.currentDate, "DD.MM.YYYY");
    // });
  }

  // openProjects: state => state.records.filter(project => !project.completed)
}
