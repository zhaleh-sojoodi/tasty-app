const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')
const uuid = require('uuid/v4') ;
const mime = require ('mime-types');
const { Storage }  = require ('@google-cloud/storage');
const path = require('path')
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

const getUserById = async (req, res, next) => {
    const userId = req.params.userId    
    let user
    try {
        user = await User.findById((userId), '-password')
    }  catch (err) {
        return next(new httpError('Fetching user by userId failed', 500))
    }

    if(!user) {
        return next(new httpError('Could not find any user by provided user Id'), 404)
    }

    res.json({ user : user.toObject({ getters: true }) })
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
        return next(new httpError('Signing up failed', 500))
    }
    if (existingUser) {
        return next(new httpError('User exists already, please login instead', 422))
    }

    // Encrypt password 
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
        recipes : []
    });
    
    try {
        await newUser.save()
    } catch (err) {
        console.log(err)
        return next(new httpError('Signing up failed'), 500)
    }

    let token;
    try {
        token = jwt.sign(
            {userId : newUser.id, email : newUser.email},
            process.env.JWT_SECRET,
            { expiresIn : '24h' }
        );
    } catch (err) {
        return next(new httpError('Signing up failed'), 500)
    }

    res.json({
        userId : newUser.id,
        name : newUser.name,
        token : token
    })
}
   
const login = async (req, res, next) => {
    const { email, password } = req.body

    let existingUser;
    try {
        existingUser = await User.findOne({ email : email })
    } catch (err) {
        return next(new httpError('Logging in failed', 500))
    }

    if(!existingUser) {
        return next(new httpError('Invalid Credentials', 401))
    }

    let isValidPassword = false;
    try {
        isValidPassword = await bcrypt.compare(password, existingUser.password)
    } catch (err) {
        console.log(err)
        return next(new httpError('could not log you in'), 500)
    }
    if(!isValidPassword) {
        return next(new httpError('Invalid Credentials', 401))
    }

    let token ;
    try {
        token = await jwt.sign( 
            { userId : existingUser.id, email : existingUser.email },
            process.env.JWT_SECRET,
            { expiresIn : '1h' }
        )
    } catch (err) {
        return next(new httpError('Logging up failed'), 500)
    }

    res.json({
       name  : existingUser.name, 
       userId : existingUser.id ,
       email : existingUser.email,
       token : token
    })
}

const update = async (req, res, next) => {
    const error = validationResult(req)
    if(!error.isEmpty()) {
        return next(new httpError('Invalid input passed.', 422))
    }

    const userId = req.userData.userId
    const {name, biography} = req.body

    let user
    try {
        user = await User.findById(userId)
    } catch(err) {
        return next(new httpError('Could not find a user with the provided ID.', 500))
    }

    user.name = name
    user.biography = biography

    // If user uploaded a profile image
    let bucket;
    let blob;
    if(req.file) {
        let oldImageURL = user.imageURL ? user.imageURL : "";
        const type = mime.lookup(req.file.originalname);
        const gc = new Storage({
            keyFilename: path.join(__dirname, "../recipe-app-273623-1d4d668a2ea8.json"),
            projectId: process.env.GOOGLE_PROJECT_ID
        });
        bucket = gc.bucket(process.env.BUCKET_NAME) 
        blob = bucket.file(`${uuid()}.${mime.extensions[type][0]}`);
        const stream = blob.createWriteStream({
            resumable: true,
            contentType: type,
            predefinedAcl: 'publicRead',
        });

        user.imageURL = `https://storage.googleapis.com/${bucket.name}/${blob.name}`
        
        // If user had a profile picture before, delete it
        if(oldImageURL !== "" && oldImageURL) {
            const parts = oldImageURL.split('/')
            const filename = parts[(parts.length)-1]
            try {
                await gc.bucket(process.env.BUCKET_NAME).file(filename).delete()
                console.log("Previous profile picture deleted")
            } catch (err) {
                console.log("Couldn't delete previous profile picture")
                console.log(err)
            }
        }

        stream.on('error', err => {
            next(err);
        });

        stream.on('finish', () => {
            console.log("Finish stream.")
        });
    
        stream.end(req.file.buffer);
    }
    
    try {
        await user.save()
    } catch (err) {
        console.log(err)
        return next(new httpError('Updating the user failed', 500))
    }

    let response;
    if(req.file) {
        response = {
            name: user.name,
            biography : user.biography,
            imageUrl: `https://storage.googleapis.com/${bucket.name}/${blob.name}`
        }
    } else {
        response = {
            name: user.name,
            biography : user.biography
        }
    }

    res.status(200).json({
        data: response
    })
}

exports.getUsers = getUsers
exports.getUserById = getUserById
exports.signup = signup
exports.login = login
exports.update = update



 