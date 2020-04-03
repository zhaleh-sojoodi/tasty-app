const {validationResult} = require('express-validator')
const mongoose = require('mongoose')
const httpError = require('../models/http-error')
const Recipe = require('../models/recipe')
const User = require('../models/user')

const getRecipesByUserId = async (req, res, next) => {
    const userId = req.params.uid
    let userWithRecipes;
    try {
        userWithRecipes = await User.findById(userId).populate('recipes');
    }  catch (err) {
        return next(new httpError('Fetching recipes by userId failed', 500))
    }
    
    if(!userWithRecipes || userWithRecipes.length == 0) {
        return next(new httpError('Could not find any recipes by provided user Id'), 404)
    }
    return res.json({ recipes : 
        userWithRecipes.recipes.map( recipe => recipe.toObject({ getters : true }))
    })

}

const addRecipe = async (req, res, next) => {
    const error = validationResult(req)
    if (!error.isEmpty()) {
        return next(new httpError('Invalid input passed.', 422))
    }
    const {title, description, imageURL, difficulty, cookingTime, preparationTime, category, ingredients, directions, servings, creator } = req.body
    const newRecipe = new Recipe ({
        title,
        description, 
        imageURL,
        difficulty,
        cookingTime,
        preparationTime, 
        category,
        ingredients,
        directions, 
        servings, 
        creator
    })
    let user;
    try {
        user = await User.findById(creator)
    } catch(err) {
        return next(new httpError('finding a user failed'), 500)
    }
    if (!user) {
        return next(new httpError('could not find the user for provided id'), 404)
    }

    try {
        const sess = await mongoose.startSession()
        sess.startTransaction()
        await newRecipe.save({ session : sess })
        user.recipes.push(newRecipe)
        await user.save({session : sess})
        await sess.commitTransaction()
    } catch (err) {
        console.log(err)
        return next(new httpError('Adding a recipe failed'), 500)
    }
    res.json(newRecipe)
}

exports.getRecipesByUserId = getRecipesByUserId
exports.addRecipe = addRecipe;