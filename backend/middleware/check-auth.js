const jwt = require('jsonwebtoken')
const httpError = require('../models/http-error')

module.exports = (req, res , next) => {
    if (req.method === 'OPTIONS') {
        return next();
    }
    try {
        const token = req.headers.authorization.split(' ')[1] //Authorization Bearet TOKEN
        if (!token) {
            throw new Error('Authentication failed!')
        }
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        req.userData = { userId : decodedToken.userId }
        next()
    } catch (err) {
        return next(new httpError('Authentication failed!', 401))
    }

}