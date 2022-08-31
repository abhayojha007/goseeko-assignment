const mongoose = require("mongoose");

const processDataJob = new mongoose.Schema({
  lastModifiedDate: {
    type: Date,
    required: true,
  },
});

const ProcessDataJob = mongoose.model("processDataJobs", processDataJob);

module.exports = { ProcessDataJob };
