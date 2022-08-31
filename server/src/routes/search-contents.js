const { RecordItem } = require("../model/recordItem");
const getSearchResults = async (req, res) => {
  try {
    const { search_text } = req.body;
    const searchResults = await RecordItem.find(
      { $text: { $search: new RegExp(search_text) } },
      { score: { $meta: "textScore" } }
    )
      .select({
        content_with_style_s3: 0,
        content_with_style: 0,
      })
      .sort({ score: { $meta: "textScore" } })
      .limit(10);
    res.send(searchResults);
  } catch (err) {
    res.status(500);
  }
};

module.exports = {
  getSearchResults,
};
