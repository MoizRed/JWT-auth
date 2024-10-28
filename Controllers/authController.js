const User = require("../models/User");
const JWT = require("jsonwebtoken");
const dotenv = require("dotenv").config();
const handleErrors = require("../Errors/handleErrors")
const express = require("express")
const maxAge = 3 * 24 * 60 * 60 * 1000;
//CREATE TOKEN
const createToken = (id) => {
  return JWT.sign({ id }, process.env.JWTSECRET, {
    expiresIn: maxAge,
  });
};

// controller actions
module.exports.signup_get = (req, res) => {
  res.render("signup");
};

module.exports.login_get = (req, res) => {
  res.render("login");
};

module.exports.signup_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.create({ email, password });

    //creating webtokens
    const token = createToken(user._id);

    res.cookie("jwt", token, { httpOnly: true, makeAge: maxAge });
    res.status(201).json({ token: token, id: user._id });
  } catch (err) {
    const errors = handleErrors(err);
    console.log("\nTHE ERROR IS HERE BITCH : ", err, "\n" , "COOOOKE  :" , req.cookies.jwt);
    res.status(400).json({ errors });
  }
};

module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    if (user) {
      const token = createToken(user._id);
      res.cookie("jwt", token, { httpOnly: true, makeAge: maxAge });
      res.status(200).json({ user: user._id });
    }
  } catch (err) {
    const errors = handleErrors(err);
    console.log("\nTHE ERROR IS HERE BITCH : ", err, "\n" , "COOOOKE  :" , req.cookies.jwt);
    res.status(400).json({ errors });
  }
};


