const { Router } = require("express");

const authController = require("../Controllers/authController");

const router = Router();

router.route("/signup").get(authController.signup_get).post(
  authController.signup_post,
);

router.route("/login").get(authController.login_get).post(
  authController.login_post,
);

module.exports = router;
