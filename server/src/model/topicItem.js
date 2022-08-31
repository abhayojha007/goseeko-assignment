const mongoose = require("mongoose");

const TopicSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  topic_name: {
    type: String,
    required: true,
  },
  alphabet_index: {
    type: String,
    required: true,
  },
  content_length: {
    type: Number,
    required: true,
  },
  preview_content: [
    {
      type: String,
    },
  ],
});

TopicSchema.index({ topic_name: 1 });

const TopicItem = mongoose.model("topics", TopicSchema);

module.exports = { TopicItem };
