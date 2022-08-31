const { RecordItem } = require("../model/recordItem");
const { getTopicName } = require("../helpers");

const getContentById = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const recordsList = await RecordItem.find({ id: id }).select({
      content_with_style_s3: 0,
    });
    let TopicName = getTopicName(recordsList);
    if (!TopicName.content_with_style) {
      TopicName = recordsList[1];
    }

    const RecordContent = {
      id: req.params.id,
      topic_name:
        TopicName.content_with_style.substring(
          1,
          TopicName.content_with_style.length
        ) || "",
      contents: [],
    };
    RecordContent.contents = recordsList.map((item) => {
      if (item.header !== TopicName.header) {
        return item.content_with_style.substring(
          1,
          item.content_with_style.length
        );
      }
    });
    RecordContent.contents = RecordContent.contents.filter((elem) => {
      return !!elem && elem.split(" ").length > 1;
    });
    res.send(RecordContent);
  } catch (err) {
    console.log("err in getting content by id", err);
    res.sendStatus(500);
  }
};

module.exports = { getContentById };
