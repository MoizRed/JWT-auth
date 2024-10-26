const User = require("../models/User");
const JWT = require("jsonwebtoken");
const dotenv = require("dotenv").config();
// handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: "", password: "" };

    if(err.message.includes("incorrect password")){
      errors.password = "incorrect password"
      return errors
    }

    if(err.message.includes("incorrect email")){
      errors.email = "incorrect email or USER NOT REGISTERED"
      return errors
    }

  // duplicate email error
  if (err.code === 11000) {
    errors.email = "that email is already registered";
    return errors;
  }

  // validation errors
  if (err.message.includes("user validation failed")) {
    // console.log(err);
    Object.values(err.errors).forEach(({ properties }) => {
      // console.log(val);
      // console.log(properties);
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

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

    const errors = handleErrors(err)
    console.log("\nTHE ERROR IS HERE BITCH : " , err , '\n')
    res.status(400).json({ errors});
  }
};
