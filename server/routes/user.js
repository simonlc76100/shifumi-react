const express = require("express");
const router = express.Router();
const createToken = require("../lib/jwt").createToken;
require("../lib/mongo");
const User = require("../models/user");
const verifyJwt = require("../middlewares/verifyJwt");

router.use(express.json());

router.get("/users", verifyJwt(), async function (req, res) {
  try {
    let users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/users/:id", verifyJwt(), async function (req, res) {
  try {
    let user = await User.findById(req.params.id);
    if (!user) {
      return res.sendStatus(404);
    }
    res.json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/users/:id", verifyJwt(), async function (req, res) {
  try {
    let user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!user) {
      return res.sendStatus(404);
    }
    res.json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/login", async function (req, res) {
  try {
    let user = await User.findOne({
      username: req.body.username,
      password: req.body.password,
    });
    if (!user) {
      return res.sendStatus(401);
    }
    res.json({ token: await createToken(user) });
  } catch (error) {
    res.status(500).json(error);
  }
});
router.post("/register", async function (req, res) {
  try {
    let user = await User.findOne({
      username: req.body.username,
    });
    if (!user) {
      user = new User({
        username: req.body.username,
        password: req.body.password,
      });
      user = await user.save();
      res.status(201).json(user);
    } else {
      res.status(409).json({ error: "User already exists" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
