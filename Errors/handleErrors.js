// handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: "", password: "" };

  //signup error handlers

  if (err.message.includes("minimum password length is 6 characters")) {
    errors.password = "short password , use more ";

    return errors;
  }
  if (err.message.includes("please enter a valid email")) {
    errors.email = "use a valid email";

    return errors;
  }

  if (err.message.includes("incorrect password")) {
    errors.password = "incorrect password";
    return errors;
  }

  if (err.message.includes("incorrect email")) {
    errors.email = "incorrect email or USER NOT REGISTERED";
    return errors;
  }

  // duplicate email error
  if (err.code === 11000) {
    errors.email = "that email is already registered";
    return errors;
  }

  // validation errors
  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};


module.exports = handleErrors