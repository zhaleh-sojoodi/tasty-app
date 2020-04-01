const express = require('express')

const route = express.Router();

route.get('/', (req, res, next) => {
    res.json({Message : "Hello From Recipe Page!"})
})


module.exports = route