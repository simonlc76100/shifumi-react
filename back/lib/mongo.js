const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI, {
  dbName: process.env.DB_NAME,
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

const db = mongoose.connection;

db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

module.exports = db;
