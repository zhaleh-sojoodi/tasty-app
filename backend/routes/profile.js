const express = require('express')
const router = express.Router()
const auth = require('../middleware/check-auth')
const Profile = require('../models/Profile')
const User = require('../models/User')


// @route    GET api/profile/me
// @desc     Get current users profile
// @access   Private
router.get('/', auth, async (req, res) => {
    try{
        const profile = await (await Profile.findOne({ user: req.user.id})).populated('user', [name, avatar])
    } catch(err){
        console.log(err.message)
        res.status(500).send('Server Error')
    }
})
module.exports = router