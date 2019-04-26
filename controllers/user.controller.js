const jwt = require("jsonwebtoken");
const passwordHash = require('password-hash');
const DB = require("../common/database");
const shortid = require("shortid");

const generateToken = user => {
  return jwt.sign(
    {
      _id: user._id,
      created: Date.now()
    },
    "this is secret"
  );
};

module.exports = {
  loginUser: async (req, res) => {
    //
  },
  createUser: async (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    DB.get("user_login")
      .push({
        username: username,
        password: passwordHash.generate(password),
        id: shortid.generate(),
      })
      .write()
  }
};
