export default {
  findRecordByDate(state) {
    return date =>
      state.records.find(record => {
        return record.date === date;
      });
  },
  openProjects: state => state.records.filter(project => !project.completed)
};
