const express = require('express')
const { check } = require('express-validator')
const recipeController = require('../controller/recipe-controller')
const checkAuth = require('../middleware/check-auth')

const router = express.Router()

router.get('/user/:uid' , recipeController.getRecipesByUserId )
//router.use(checkAuth)
router.post(
    '/', 
    [
        check("title").not().isEmpty(),
        check("category").not().isEmpty(),
        check("ingredients").not().isEmpty(),
        check("directions").not().isEmpty(),
    ], 
    recipeController.addRecipe )
router.patch(
    '/:recipeId',
    [
        check("title").not().isEmpty(),
        check("ingredients").not().isEmpty(),
        check("directions").not().isEmpty(),
    ], 
    recipeController.updateRecipe)
router.delete('/:recipeId', recipeController.deleteRecipe)
module.exports = router