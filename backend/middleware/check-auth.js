const jwt = require('jsonwebtoken')
const httpError = require('../models/http-error')

module.exports = (req, res , next) => {
    try {
        const token = req.headers.authorization.splite(' ')[1]
        if (!token) {
            throw new Error('Authentication failed!')
        }
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        req.userData = { userId : decodedToken.userId }
    } catch (err) {
        return next(new httpError('Authentication failed!', 401))
    }

}