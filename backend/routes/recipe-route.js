const express = require('express')
const recipeController = require('../controller/recipe-controller')

const router = express.Router()

router.post('/', recipeController.addRecipe)




module.exports = router