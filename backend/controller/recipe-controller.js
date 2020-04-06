const {validationResult} = require('express-validator')
const mongoose = require('mongoose')
const httpError = require('../models/http-error')
const Recipe = require('../models/recipe')
const User = require('../models/user')

const getAllRecipes = async (req, res, next) => {
    let recipes
    try {
        recipes = await Recipe.find({})
    } catch {
        return next(new httpError('Fetching users failed', 500))
    }
    res.json({ recipes : recipes.map( recipe => recipe.toObject( { getters: true })) })
}

const getRecipesByUserId = async (req, res, next) => {
    const userId = req.params.userId
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

const getRecipeByRecipeId = async (req, res, next) => {
    const recipeId = req.params.recipeId

    let recipe
    try {
        recipe = await Recipe.findById(recipeId)
    } catch(err) {
        return next(new httpError('Could not the recipe', 500))
    }

    if (!recipe) {
        return next(new httpError('Could not find the recipe by provided id' , 404))
    }

    res.json({ recipe : recipe.toObject({ getters : true }) })
}

const addRecipe = async (req, res, next) => {
    const error = validationResult(req)
    if (!error.isEmpty()) {
        return next(new httpError('Invalid input passed.', 422))
    }
    const {title, description, difficulty, cookingTime, preparationTime, category, ingredients, directions, servings, creator } = req.body
    console.log(req.file)
    const newRecipe = new Recipe ({
        title,
        description, 
        difficulty,
        cookingTime,
        preparationTime, 
        likes : 0,
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

const like = async (req, res, next ) => {
    const userId = req.params.userId
    const recipeId = req.params.recipeId
    
    let user
    try {
        user = await User.findById(userId)
        console.log(user)
    } catch(err) {
        return next(new httpError('finding user failed'), 500)
    }
    if (!user) {
        return next(new httpError('could not find the user for provided id'), 404)
    }

    let recipe 
    try {
        recipe = await Recipe.findById(recipeId)
    } catch(err) {
        return next(new httpError('finding recipe failed'), 500)
    }
    if (!recipe) {
        return next(new httpError('could not find the recipe for provided id'), 404)
    }

    //check if the recipe is already in likes array 
    const isInArray = user.likes.some(function (like) {
        return like.equals(recipeId);
    });
    try {    
        const sess = await mongoose.startSession()
        sess.startTransaction()
        if (isInArray) {
            recipe.likes --
            user.likes.pull(recipe)
        } else {
            recipe.likes ++
            user.likes.push(recipe)
        }
        await recipe.save({ session: sess })
        await user.save({ session : sess })
        await sess.commitTransaction()
    } catch (err) {
        console.log(err)
        return next(new httpError('Adding a recipe in favourite list failed'), 500)
    }

    res.json(recipe)
}

const updateRecipe = async (req,res, next) => {
    const error = validationResult(req)
    if(!error.isEmpty()) {
        return next(new httpError('Invalid input passed.', 422))
    }

    const recipeId = req.params.recipeId
    const {title, ingredients, directions} = req.body

    let recipe
    try {
        recipe = await Recipe.findById(recipeId)

    } catch (err) {
        return next(new httpError('could not find the recipe by privided Id', 500))
    }

    //check if the creator is the user logged in 
    if (recipe.creator.toString() !== req.userData.userId) {
        return next(new httpError('You are not allowed to update the recipe', 401))
    }

    recipe.title = title
    recipe.ingredients = ingredients
    recipe.directions = directions

    try {
        await recipe.save()
    } catch (err) {
        return next(new httpError('Updating the recipe failed'), 500)
    }
    res.json({ recipe : recipe.toObject({ getters : true})})
}

const deleteRecipe = async (req, res, next) => {
    const recipeId = req.params.recipeId
    let recipe 
    try {
        recipe = await Recipe.findById(recipeId).populate('creator')

    } catch (err) {
        return next(new httpError('Deleting the recipe failed'), 500)
    }

    if(!recipe) {
        return next(new httpError('Couldnot find the recipe by provided id', 404))
    }

    //Check if the creator is the user logged in 
    if(recipe.creator.id !== req.userData.userId) {
        return next(new httpError('You are not allowed to delete the recipe', 401))
    }
    
    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await recipe.remove({ session : sess })
        recipe.creator.recipes.pull(recipe)
        await recipe.creator.save({ session: sess})
        sess.commitTransaction()
    } catch (err) {
        console.log(err)
        return next(new httpError('Deleting the recipe failed'), 500)
    }
    res.json({ message : "Deleted recipe"})
}

exports.getAllRecipes = getAllRecipes
exports.getRecipesByUserId = getRecipesByUserId
exports.getRecipeByRecipeId = getRecipeByRecipeId
exports.addRecipe = addRecipe;
exports.like = like;
exports.updateRecipe = updateRecipe;
exports.deleteRecipe = deleteRecipe