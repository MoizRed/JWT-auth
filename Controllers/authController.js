const hash = require("hash")

const mongoose = require("mongoose");

const User = require("../models/User");


module.exports.signup_get = (req, res) => {
  res.render("../views/signup.ejs");
};

module.exports.login_get = (req, res) => {
  res.render("../views/login.ejs");
};

module.exports.signup_post = async (req, res) => {
  const { email, password } = req.body;


  try {
    const user = await User.create(
      {
        email,
        password,
      },
      console.log("created.")
    );
    res.send("created");
  } catch (err) {
    console.log(err);
    res.status(400).send("error botch");
  }
};

module.exports.login_post = (req, res) => {
  const body = req.body;
  console.log(body);
  res.send("user_post");
};
