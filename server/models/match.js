const mongoose = require("mongoose");

const matchSchema = new mongoose.Schema({
  user1: {
    type: Object,
  },
  user2: {
    type: Object,
  },
  turns: {
    type: Array,
    required: true,
  },
  winner: {
    type: Object,
  },
});

const Match = mongoose.model("Match", matchSchema);

module.exports = Match;
