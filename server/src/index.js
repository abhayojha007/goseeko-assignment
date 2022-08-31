const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { json } = require("body-parser");

const { TopicItem } = require("./model/topicItem");
const { hProcessAllRecords } = require("./batch_process/process-records-dumps");
const { ProcessDataJob } = require("./model/processDataJob");
const { getAllTopics } = require("./routes/all-topics");
const { getContentById } = require("./routes/get-topic-content");
const { getSearchResults } = require("./routes/search-contents");

const app = express();

app.use(cors());
app.use(json());

app.get("/", getAllTopics);
app.get("/content/:id", getContentById);
app.post("/search", getSearchResults);

const start = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/Downloads", {});
    console.log("Connected to MongoDb");
  } catch (err) {
    console.error(err);
  }

  const processDataJobRecord = await ProcessDataJob.find({});
  console.log();
  if (processDataJobRecord.length) {
    console.log("process data record found");
    if (
      new Date() - processDataJobRecord[0].lastModifiedDate >
      1000 * 60 * 60 * 24
    ) {
      console.log("date time retriction ok");
      await TopicItem.deleteMany({});
      console.log("topic it cleared");
      await hProcessAllRecords();
      await ProcessDataJob.updateOne(
        { _id: processDataJobRecord[0]._id },
        { lastModifiedDate: new Date() }
      );
    } else {
      console.log("date time check failed");
    }
  } else {
    console.log("processing the records for first time");
    await hProcessAllRecords();
    const record = new ProcessDataJob({ lastModifiedDate: new Date() });
    await record.save();
  }

  app.listen(5000, () => {
    console.log("Listening on port 5000!!!!!!!!");
  });
};

start();
