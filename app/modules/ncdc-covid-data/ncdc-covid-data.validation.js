const validationRules = {
  totalMetricsGroupByDate: {
    rules: {
      state: 'string|max:12'
    },
    customMessages: {}
  },
  getById: {
    rules: {
      id: 'required|mongoId|exists:ncdc,_id'
    },
    customMessages: {}
  },
  store: {
    rules: {},
    customMessages: {}
  },
  update: {
    rules: {},
    customMessages: {}
  }
};

module.exports = validationRules;
