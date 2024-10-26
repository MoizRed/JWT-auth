const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const userschema = mongoose.Schema({
  email: {
    type: String,
    required: [true, "email is required"],
    unique: [true, "user name already exits"],
    lowercase: true,
    validate: [isEmail, "please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "password is required"],
    minLength: [6, "minimum password length is 6 characters"],
  },
});

//mongoose web hooks
//after after doc is saved
userschema.post("save", function (doc, next) {
  console.log("new user was created & saved", doc);

  next();
});

//before the doc is saved
userschema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  console.log(this.password);
  next();
});

userschema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });

  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    console.log(auth);

    if (auth) {
      return user;
    }
    throw Error("incorrect password");
  }
  throw Error("incorrect email");
};

const User = mongoose.model("users", userschema);

module.exports = User;
