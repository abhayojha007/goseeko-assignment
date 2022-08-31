const mongoose = require("mongoose");

const recordSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  header: {
    type: String,
    required: true,
  },
  content_without: {
    type: String,
    required: true,
  },
  content_with_style: {
    type: String,
    required: true,
  },
  content_with_style_s3: {
    type: String,
    required: true,
  },
  is_active: {
    type: Number,
    required: true,
  },
});

recordSchema.index(
  { header: "text", content_without: "text" },
  {
    weights: {
      header: 5,
      content_without: 2,
    },
  }
);

const RecordItem = mongoose.model("content_dumps", recordSchema);

module.exports = { RecordItem };
