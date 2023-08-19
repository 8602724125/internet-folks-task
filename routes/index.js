const express = require('express')
const router = express.Router();

router.use('/auth', require('./user'))

router.use('/community', require('./community'))

router.use('/member', require('./member'))

router.use('/role', require('./role'))

module.exports = router