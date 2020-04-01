const {validationResult} = require('express-validator')
const httpError = require('../models/http-error')
const Recipe = require('../models/recipe')

const addToRecipe = async((req, res, next) => {
    const error = validationResult(req)
    if (!error.isEmpty()) {
        return next(new httpError())
    }
})