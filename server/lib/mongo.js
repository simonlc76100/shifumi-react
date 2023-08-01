const mongoose = require("mongoose");
const mongodbHostname = process.env.DB_HOSTNAME;
const mongodbURI = `mongodb://${mongodbHostname}:27017/${process.env.DB_NAME}`;

mongoose.connect(mongodbURI, {
  dbName: process.env.DB_NAME,
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

const db = mongoose.connection;

db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

module.exports = db;
