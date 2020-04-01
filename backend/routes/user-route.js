const express = require('express')

const route = express.Router();

route.get('/', (req, res, next) => {
    res.json({Message : "Hello From User Page!"})
})


module.exports = route