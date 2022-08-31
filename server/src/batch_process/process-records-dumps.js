const { RecordItem } = require("../model/recordItem");
const { TopicItem } = require("../model/topicItem");
const { getTopicName } = require("../helpers");

const getRecordIdList = async () => {
  try {
    const uniqueIdList = await RecordItem.distinct("id", {});
    return uniqueIdList;
  } catch (error) {
    console.log("UNABLE TO GET UNIQUE ID LIST", JSON.stringify(error));
  }
};
const processRecordsWithId = async (id) => {
  try {
    const RecordsList = await RecordItem.find({ id: id }).select({
      content_with_style_s3: 0,
      content_with_style: 0,
    });
    const TopicName = getTopicName(RecordsList);
    if (TopicName.header) {
      let content_length = 0;
      const preview_content = [];
      const topic_name = TopicName.header;
      RecordsList.forEach((element) => {
        if (element.content_without.split(" ").length > 1) {
          content_length += element.content_without.split(" ").length;
          if (element.header !== topic_name) {
            preview_content.push(
              element.content_without.substring(
                1,
                element.content_without.length - 1
              )
            );
          }
        }
      });
      // check if topic name already exists
      const checkIfTopicAvailable = await TopicItem.find({
        topic_name: topic_name,
      });

      if (
        checkIfTopicAvailable.length &&
        checkIfTopicAvailable[0].content_length <= content_length
      ) {
        await TopicItem.updateOne(
          { _id: checkIfTopicAvailable[0]._id },
          {
            id: TopicName.id,
            topic_name,
            alphabet_index: TopicName.header[0].toUpperCase(),
            content_length,
            preview_content,
          }
        );
      } else {
        const topicItem = new TopicItem({
          id: TopicName.id,
          topic_name,
          alphabet_index: TopicName.header[0].toUpperCase(),
          content_length,
          preview_content,
        });
        await topicItem.save();
      }
    }
  } catch (error) {
    console.log(
      `UNABLE TO PROCESS RECORDS WITH ID:${id}`,
      JSON.stringify(error)
    );
  }
};

const hProcessAllRecords = async () => {
  try {
    const uniqueRecordId = await getRecordIdList();
    uniqueRecordId.forEach(async (element) => {
      await processRecordsWithId(element);
    });
  } catch (err) {
    console.log("Error in hProcessAllRecords", err);
  }
};

module.exports = { hProcessAllRecords };
