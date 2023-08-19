const express = require('express')
const router = express.Router()
const { body } = require("express-validator");
const UserService = require('../services/user.service')
const AuthService = require('../middleware/auth')

router.post('/signup', 
  body("name")
  .trim()
  .notEmpty()
  .withMessage("Name is required"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email address is required")
    .isEmail()
    .withMessage("Enter a valid email addres"),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password field is required")
    .isStrongPassword({
      minLength: 6,
      minLowercase: 1,
      minUppercase: 1,
      minSymbols: 1,
    })
    .withMessage(
      "Password must be greater than 5 digits and contain at least one uppercase letter, one lowercase letter, and one number"),
    UserService.signup
)

router.post('/signin', 
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email address is required")
    .isEmail()
    .withMessage("Enter a valid email addres"),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password field is required")
    .isStrongPassword({
      minLength: 6,
      minLowercase: 1,
      minUppercase: 1,
      minSymbols: 1,
    })
    .withMessage("Password must be greater than 5 digits and contain at least one uppercase letter, one lowercase letter, and one number"),
    UserService.signin
)

router.get('/me', AuthService.authenication, UserService.getMe)

module.exports = router;