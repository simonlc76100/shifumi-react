const express = require("express");
const app = express();
const userRouter = require("./routes/user");
const matchRouter = require("./routes/match");
const cors = require("cors");

app.use(cors());

app.use(express.json());
app.use("/", userRouter);
app.use("/", matchRouter);

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
