const express = require('express')
const { check } = require('express-validator')
const recipeController = require('../controller/recipe-controller')

const router = express.Router()

router.get('/user/:uid' , recipeController.getRecipesByUserId )
router.post(
    '/', 
    [
        check("title").not().isEmpty(),
        check("category").not().isEmpty(),
        check("ingredients").not().isEmpty(),
        check("directions").not().isEmpty(),
    ], 
    recipeController.addRecipe )

module.exports = router