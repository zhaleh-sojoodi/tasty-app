const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const User = require('../models/User')

//@route   GET api/auth
//@desc    Test route
//@access   Public
router.get('/', auth, (req, res) => res.send('Auth route'))
module.exports = router