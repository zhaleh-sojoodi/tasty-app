const express = require('express')
const router = express.Router()
const auth = require('../middleware/check-auth')
const Profile = require('../models/Profile')
const User = require('../models/User')


// @route    GET api/profile/me
// @desc     Get current users profile
// @access   Private
router.get('/me', auth, async (req, res) => {
    try{
        const profile = await profile.findOne({ 
            user: req.user.id})
        if(!profile) {
            return res.status(400).json({msg: 'There is no profile for this user'})
        }
         // only populate from user document if profile exists
    res.json(profile.populate('user', ['name', 'avatar']));
    } catch(err){
        console.log(err.message)
        res.status(500).send('Server Error')
    }
})
const {
    location,
    bio,
    youtube,
    twitter,
    instagram,
    linkedin,
    facebook
   
} = req.body

//Build profile object
const profileFields = {}
profileFields.user = req.user.id
if(location)profileFields.location = location
if(bio)profileFields.bio = bio



//Build social object.
// profileFields.social = {}
// if(youtube) profileFields.social.youtube = youtube
// if(twitter) profileFields.social.twitter = twitter
// if(facebook) profileFields.social.facebook = facebook
// if(linkedin) profileFields.social.linkedin = linkedin
// if(instagram) profileFields.social.instagram = instagram 
module.exports = router