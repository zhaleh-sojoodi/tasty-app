const bcrypt = require('bcryptjs')
const {validationResult} = require('express-validator')
const httpError = require('../models/http-error')
const User = require('../models/user')

const addUser = async (req, res, next) => {
    const error = validationResult(req)
    if(!error.isEmpty()) {
        return next(httpError('Invalid input passed.', 422))
    }
    const { name, email, password } = req.body;
    const newUser = new User({
        name,
        email,
        password, 
        recipes : [],
        favorites : []
    });
    //Encrypt password
    // const salt = await bcrypt.genSalt(10);
    // user.password = await bcrypt.hash(password, salt)

    try {
        await newUser.save()
    } catch (err) {
        return next(new httpError('Adding a user failed'), 500)
    }
    res.json(newUser)
}

exports.addUser = addUser

 