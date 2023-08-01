const {getLastTurnPlayed} = require("../lib/shifumi");
const Match = require("../models/match");

module.exports = async (req, res, next) => {
  const match = await Match.findById(req.params.id);
  const idTurn = parseInt(req.params.idTurn);
  if (match.winner !== undefined) {
    return res.status(400).json({match: "Match already finished"});
  }
  if (match.turns.length < idTurn - 1) {
    return res.status(400).json({turn: "not found"});
  }
  const lastTurn = getLastTurnPlayed(match);
  if (lastTurn + 1 !== idTurn - 1) {
    return res.status(400).json({turn: "not last"});
  }
  const turn = match.turns[idTurn - 1] || {};
  const isPlayer1 = match.user1._id === req.user._id;
  const isPlayer2 = match.user2._id === req.user._id;
  if ((isPlayer1 && turn.user1) || (isPlayer2 && turn.user2)) {
    return res.status(400).json({user: "move already given"});
  }
  req.match = match;
  req.turn = turn;
  next();
};
