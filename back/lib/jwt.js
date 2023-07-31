require("dotenv").config();
const jwt = require("jsonwebtoken");

function createToken(user) {
  const token = jwt.sign(
    {
      _id: user._id,
      username: user.username,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1y",
      algorithm: "HS256",
    }
  );

  return token;
}

function verifyToken(token) {
  return new Promise((resolve, reject) => {
    try {
      const user = jwt.verify(token, process.env.JWT_SECRET);
      resolve(user);
    } catch (err) {
      reject(err);
    }
  });
}

module.exports = {
  createToken,
  verifyToken,
};
