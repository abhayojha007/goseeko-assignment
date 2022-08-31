const { TopicItem } = require("../model/topicItem");

const getAllTopics = async (req, res) => {
  try {
    const topicList = await TopicItem.find({}).sort({ alphabet_index: 1 });
    const allTopics = {};
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").forEach((e) => (allTopics[e] = []));
    topicList.forEach((item) => {
      allTopics[item.alphabet_index].push({
        id: item.id,
        topic_name: item.topic_name,
        content_length: item.content_length,
        //preview_content: item.preview_content.splice(0, 2),
      });
    });
    // filter alpahbet index for unique topic name with largest content
    Object.keys(allTopics).forEach((key) => {
      // get all unique topic names
      const uniqueTopics = {};
      if (allTopics[key].length) {
        allTopics[key].forEach((item) => {
          if (uniqueTopics[item.topic_name]) {
            if (
              uniqueTopics[item.topic_name].content_length < item.content_length
            ) {
              uniqueTopics[item.topic_name] = {
                id: item.id,
                content_length: item.content_length,
              };
            }
          } else {
            uniqueTopics[item.topic_name] = {
              id: item.id,
              content_length: item.content_length,
              //preview_content: item.preview_content,
            };
          }
        });
      }
      // map unique tic names for response
      allTopics[key] = Object.keys(uniqueTopics).map((x) => {
        return {
          id: uniqueTopics[x].id,
          topic_name: x,
          //preview_content: uniqueTopics[x].preview_content,
        };
      });
    });
    const topicArray = [];
    Object.values(allTopics).forEach((element) => {
      topicArray.push(...element);
    });
    res.send(topicArray);
  } catch (err) {
    console.log("Unable to fetch topics list", err);
    res.satus(500).send("An error occured");
  }
};

module.exports = { getAllTopics };
