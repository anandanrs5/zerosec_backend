const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const Users = require("../../models/user");

const isEmailNotInUse = async (value) => {
  const user = await Users.findByEmail(value);
  if (user) {
    return Promise.reject("Email is already in use");
  }
  return Promise.resolve();
};

const signupValidation = [
  body("email")
    .isEmail()
    .withMessage("Invalid Email, example:abc@gmail.com")
    .custom(isEmailNotInUse)
];

router.post("/", signupValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const signupDetails = req.body;
    const hashedPassword = await bcrypt.hash(signupDetails.password, 10);
    signupDetails.password = hashedPassword;

    const signup = new Users(signupDetails);
    const savedUser = await signup.save();

    const responseObj = {
      id: savedUser._id,
      username: savedUser.fullname,
      email: savedUser.email,
      message: "signup success",
    };
    res.json(responseObj);
  } catch (error) {
    return res.status(500).json({ error: "Unable to save data" });
  }
});

module.exports = router;
