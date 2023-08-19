const express = require('express')
const { body } = require("express-validator");
const RoleService = require('../services/role.service')
const router = express.Router()

router.get('/', RoleService.getAll)

router.get('/:pageNo', RoleService.getNextRecords)

router.post('/', [
    body('name')
    .custom(value => {
      const words = value.split(/\s+/);
      if (words.length >= 2) {
        return true;
      }
      throw new Error('Name must contain at least two words');
    }),
  ],
 RoleService.create )


module.exports = router;