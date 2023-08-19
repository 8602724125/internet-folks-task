const express = require('express')
const router = express.Router()
const { body } = require("express-validator");
const AuthService = require('../middleware/auth')
const CommunityService = require('../services/community.service')



router.get('/', CommunityService.getAll)

router.post('/', 
  body("name")
  .trim()
  .notEmpty()
  .withMessage("Name is required"),
  AuthService.authenication,
  CommunityService.create
)

router.get('/:id/members', CommunityService.getAllMembers)

router.get('/me/owner', AuthService.authenication, CommunityService.getMyOwnedCommunity)

router.get('/me/member', AuthService.authenication, CommunityService.getMyJoinedCommunity)

module.exports = router;