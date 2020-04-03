const bcrypt = require('bcryptjs')
const { validationResult } = require('express-validator')
const httpError = require('../models/http-error')
const User = require('../models/user')

const getUsers = async (req, res, next) => {
    let users;
    try {
        users = await User.find({}, '-password')
    } catch(err) {
        return next(new httpError('Fetching users failed' , 500) )
    }
    res.json({ 
        users : users.map(usr => usr.toObject({ getters : true}))
    })
}

const signup = async (req, res, next) => {
    const error = validationResult(req)
    if(!error.isEmpty()) {
        return next(new httpError('Invalid input passed.', 422))
    }
    const { name, email, password } = req.body;
    let existingUser;
    try {
        existingUser = await User.findOne({ email : email })
    } catch (err) {
        return naxt(new httpError('Signing up failed', 500))
    }
    if (existingUser) {
        return next(new httpError('User exists already, please login instead', 422))
    }
    //Encrypt password 
    let hashedPassword;
    try {
        hashedPassword = await bcrypt.hash(password, 12)
    } catch (err) {
        return next(new httpError('Could not create user', 500))
    }
    const newUser = new User({
        name,
        email,
        password : hashedPassword, 
        recipes : [],
        favorites : []
    });
    
    try {
        await newUser.save()
    } catch (err) {
        console.log(err)
        return next(new httpError('Adding a user failed'), 500)
    }
    res.json({ user : newUser.toObject({ "getters" : true }) })
}


exports.getUsers = getUsers
exports.signup = signup


 