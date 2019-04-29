const jwt = require("jsonwebtoken");
const passwordHash = require("password-hash");
const DB = require("../common/database");
const shortid = require("shortid");
const moment = require("moment");
const axios = require("axios");

const generateToken = user_data => {
  return jwt.sign(
    {
      _id: user_data.id,
      username: user_data.username,
      classificationName: user_data.classificationName,
      genreId: user_data.genreId,
      created: moment().unix(),
      expiry: moment().add(60, 'minutes').unix()
    },
    "stit"
  );
};

module.exports = {
  loginUser: async (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    let user_data = DB.get("user_login")
      .find({ username })
      .value();
    if(user_data === undefined) {
      return res.status(400).json({msg: "user does not exists!"})
    }
    if(passwordHash.verify(password, user_data.password)) {
      return res.status(200).json({msg: "succesfully logged in!",
      token: generateToken(user_data)})
    } else {
      return res.status(400).json({msg: "wrong password"})
    }
  },

  createUser: async (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    let classificationName = req.body.classificationName
    let genreId = req.body.genreId
    let user_data = DB.get("user_login")
      .find({ username })
      .value();
    if (user_data) {
      return res.status(400).json({msg: "User with given username already exists!"})
    }
    DB.get("user_login")
      .push({
        username: username,
        password: passwordHash.generate(password),
        classificationName,
        genreId,
        id: shortid.generate()
      })
      .write();
    res.status(200).json({
      msg: "Succesfully registered user"
    });
  },

  setPreferences: async (req, res) => {
    let classificationName = req.body.classificationName
    let genreId = req.body.genreId
    let username = req.user.username
    DB.get("user_login")
      .find({ username })
      .assign( { classificationName,
      genreId} )
      .write()
    return res.status(200).json({
      msg: "Succesfully updated preferences"
    })
  },

  getEvents: async (req, res) => {
    try {
      const response = await axios.get("https://yv1x0ke9cl.execute-api.us-east-1.amazonaws.com/prod/events",
        {auth: {
          username: "stitapplicant",
          password: "zvaaDsZHLNLFdUVZ_3cQKns",
        },
        params: {
          classificationName: req.user.classificationName,
          genreId: req.user.genreId
        }})
      return res.status(200).json({
        msg: "Success",
        data: response.data
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        msg: "Something went wrong!",
      })
    }
  }
};
