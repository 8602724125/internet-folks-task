const express = require('express')
const router = express.Router()
const { body } = require("express-validator");
const MemberService = require('../services/member.service')
const AuthService = require('../middleware/auth')

router.post('/',
 MemberService.addMember)

router.delete('/:id',
  body("community")
  .trim()
  .notEmpty()
  .withMessage("Community is required"),
  body("role")
  .trim()
  .notEmpty()
  .withMessage("Role is required"),
  body("user")
  .trim()
  .notEmpty()
  .withMessage("User is required"),
  AuthService.authenication,
  MemberService.removeMember)

module.exports = router;