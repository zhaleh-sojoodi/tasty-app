const express = require('express')
const { check } = require('express-validator')
const recipeController = require('../controller/recipe-controller')
const checkAuth = require('../middleware/check-auth')
const imageUpload = require('../middleware/image-upload')

const router = express.Router()

router.get('/', recipeController.getAllRecipes)
router.get('/:recipeId', recipeController.getRecipeByRecipeId)
router.get('/user/:userId' , recipeController.getRecipesByUserId )
router.get('/all/popular' , recipeController.getPopularRecipes)
router.get('/all/top/rated' , recipeController.getTopRatedRecipes)
router.get('/all/recipes/search/title/:search', recipeController.getRecipesBySearch)
router.put('/rate', recipeController.rateRecipe)
router.put('/:userId/:recipeId', recipeController.toggleLike)

router.use(checkAuth)

router.post(
    '/', 
    [
        check("title").not().isEmpty(),
        check("difficulty").not().isEmpty(),
        check("cookingTime").not().isEmpty(),
        check("preparationTime").not().isEmpty(),
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
