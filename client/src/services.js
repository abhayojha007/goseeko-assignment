import axios from "axios";

export const getSearchResults = async (searchText) => {
  try {
    const searchResults = await axios.post("http://localhost:5000/search", {
      search_text: searchText,
    });
    return { isError: false, data: searchResults.data };
  } catch (err) {
    console.log("falied to get search results");
    return { isError: true, msg: "Failed to get search results." };
  }
};

export const getAllTopics = async () => {
  try {
    const topicsObject = await axios.get("http://localhost:5000");
    return { isError: false, data: topicsObject.data };
  } catch (err) {
    console.log("falied to get all topics");
    return { isError: true, msg: "Failed to get all topics." };
  }
};

export const getTopicContent = async (id) => {
  try {
    const topicData = await axios.get(`http://localhost:5000/content/${id}`);
    return { isError: false, data: topicData.data };
  } catch (err) {
    console.log("falied to get topic by Id");
    return { isError: true, msg: "Failed to get topic content." };
  }
};
