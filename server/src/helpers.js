const getTopicName = (recordList) => {
  const TopicName = recordList.filter((element) => {
    return (
      element.header ===
        element.content_without.substring(
          1,
          element.content_without.length - 1
        ) && element.header.split(" ")[0].toUpperCase() !== "UNIT"
    );
  });
  return TopicName.length ? TopicName[0] : {};
};

const successResponse = (data) => {
  return { isError: true, data };
};
const failureResponse = (data) => {
  return { isError: false, data };
};

module.exports = {
  getTopicName,
  failureResponse,
  successResponse,
};
