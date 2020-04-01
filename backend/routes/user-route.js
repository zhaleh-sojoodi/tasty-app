const express = require('express');
const router = express.Router();
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
//const jwt = require()
const { check, validationResult } =  require('express-validator')
const User = require('../models/User')

//@route        POST api/users
//@desc         Register user
//@access       Public

router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check( 
        'password',
        'Please enter a password with 6 or more characters'
    ).isLength({ min : 6})
],
 (req, res) => {
const errors = validationResult(req)
if(!error.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
}


const { name, email, password } = req.body;

try {
    //see if user exist

//get user gravatar

//Encrypt password

//Return jsonwebtoken
res.send('User route')

} catch(err) {
   console.log(err.message);
   res.status(500).send('Server error')
}



})

module.exports = router;