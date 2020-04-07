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
        return next(new httpError('Fetching recipes failed', 500))
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
        return next(new httpError('Could not find the recipe', 500))
    }

     if (!recipe) {
         return next(new httpError('Could not find the recipe by provided id' , 404))
     }
    
    res.json({ recipe : recipe.toObject({ getters : true }) })
}

<<<<<<< HEAD
const getRecipesByCategory = async(req, res, next) => {
    const category = req.params.category
    let recipes
    try{
        recipes = await Recipe.find({category})
    }
    catch(err){
        return next (new httpError('Could not find the recipe', 500))

    }
     if(!category){
        return next(new httpError('Could not find the recipe by provided category' , 404))
     }
    res.json({ recipes: recipes.map( recipe => recipe.toObject({ getters: true }) ) })
}

=======
const getLikedRecipesByUserId = async (req, res, next) => {
    const userId = req.params.userId
    
    let user
    try {
        user = await User.findById(userId).populate('likes')
    } catch(err) {
        return next(new httpError('Could not find the user'), 500)
    }
    if(!user) {
        return next(new httpError('Could not find the recipe by provided id' , 404))
    }

    let likedRecipes
    try {
        likedRecipes = user.likes
    } catch(err) {
        return next(new httpError('Feting liked recipes failed'), 500)
    }

    res.json({likedRecipes : likedRecipes.map(recipe => recipe.toObject({ getters: true })) })
}
>>>>>>> master
const getRecipesBySearch = async (req, res, next) => {
    const search = req.params.search

    let recipes
    try {
        const regex = new RegExp(escapeRegex(search), 'gi') 
        recipes = await Recipe.find({title : regex})
       
    } catch(err) {
        return next(new httpError('Fetching recipes by search title failed', 500))
    }
    res.json({ recipes : recipes.map( recipe => recipe.toObject({ getters : true })) })
}

const getPopularRecipes = async (req, res, next) => {
    let recipes
    try {
        recipes = await Recipe.find({}).sort({ "likes" : -1})
    } catch {
        return next(new httpError('Fetching popular recipes failed', 500))
    }
    res.json({ recipes :  recipes.map(recipe => recipe.toObject({ getters: true })) })
}

const getTopRatedRecipes = async (req, res, next) => {
    let recipes
    try {
        recipes = await Recipe.find({}).sort({ "ratings.averageRating" : -1 })
    } catch (err) {
        return next(new httpError('Fetching top-rated recipes failed'), 500)
    }
    res.json({ recipes: recipes.map( recipe => recipe.toObject({ getters: true }) ) })
}

<<<<<<< HEAD



=======
>>>>>>> master
const addRecipe = async (req, res, next) => {
    const error = validationResult(req)
    if (!error.isEmpty()) {
        return next(new httpError('Invalid input passed.', 422))
    }
    const {title, description, difficulty, cookingTime, preparationTime, category, ingredients, directions, servings, creator } = req.body
   
    const newRecipe = new Recipe ({
        title,
        description, 
        difficulty,
        cookingTime,
        preparationTime, 
        ratings : {
            averageRating : 0 , 
            ratings : []
        },
        likes : {
            likesNumber : 0 ,
            likes : []
        },
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

const rateRecipe = async (req, res, next) => {
    const {userId, recipeId, rate} = req.body

    let user 
    try {
        user = await User.findById(userId)
    } catch (err) {
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
   
    try {
        const sess = await mongoose.startSession()
        sess.startTransaction({ session : sess })
        recipe.ratings.ratings.push( {user : user, rating : rate} )
        const ave = (recipe.ratings.averageRating + rate ) / (recipe.ratings.ratings.length)
        recipe.ratings.averageRating = ave
        await recipe.save({ session : sess})
        await user.save({ session : sess })
        await sess.commitTransaction()

    } catch (err) {
        console.log(err)
        return next(new httpError('Rating a recipe failed'), 500)
    }

    res.json({ recipe : recipe.toObject({ getters : true }) })
}

const toggleLike = async (req, res, next) => {
    const userId = req.params.userId
    const recipeId = req.params.recipeId
    
    let user
    try {
        user = await User.findById(userId)
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
    const isInArray = recipe.likes.likes.some(function (like) {
        return like.equals(userId);
    });
   
    try {
        const sess = await mongoose.startSession()
        sess.startTransaction()
        if (isInArray) {
            recipe.likes.likesNumber --
            recipe.likes.likes.pull(user)
        } else {
            recipe.likes.likesNumber ++
            recipe.likes.likes.push(user)
        }
        await recipe.save({ session : sess})
        await sess.commitTransaction()
    } catch(err) {
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
        await recipe.creator.save({ session: sess })
        sess.commitTransaction()
    } catch (err) {
        console.log(err)
        return next(new httpError('Deleting the recipe failed'), 500)
    }
    res.json({ message : "Deleted recipe"})
}

//For search by title
function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

exports.getAllRecipes = getAllRecipes
exports.getRecipesByUserId = getRecipesByUserId
exports.getRecipesByCategory = getRecipesByCategory
exports.getRecipeByRecipeId = getRecipeByRecipeId
exports.getLikedRecipesByUserId = getLikedRecipesByUserId
exports.getPopularRecipes = getPopularRecipes
exports.getTopRatedRecipes = getTopRatedRecipes
exports.getRecipesBySearch = getRecipesBySearch
exports.addRecipe = addRecipe
exports.rateRecipe = rateRecipe
exports.toggleLike = toggleLike
exports.updateRecipe = updateRecipe
exports.deleteRecipe = deleteRecipe