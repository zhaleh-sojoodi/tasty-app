const fs = require('fs')
const {validationResult} = require('express-validator')
const mongoose = require('mongoose')
const uuid = require('uuid/v4') ;
const mime = require ('mime-types');
const { Storage }  = require ('@google-cloud/storage');
const path = require('path')
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

const getLikedRecipesByUserId = async (req, res, next) => {
    const userId = req.params.userId
   
    let likedRecipes 
    try {
         likedRecipes = await Recipe.find({ 'likes.likes' : userId})

    } catch (err) {
        console.log(err)
        return next(new httpError('Fetching recipes failed', 500))
    }
    
     res.json({ likedRecipes : likedRecipes.map(recipe => recipe.toObject({ getters: true })) })
    
}

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
        recipes = await Recipe.find({}).sort({ "likes.likesNumber" : -1})
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

const addRecipe = async (req, res, next) => {
    const error = validationResult(req)
    if (!error.isEmpty()) {
        console.log(error)
        return next(new httpError('Invalid input passed.', 422))
    }

    const type = mime.lookup(req.file.originalname);
    const gc = new Storage({
        keyFilename: path.join(__dirname, "../recipe-app-273623-1d4d668a2ea8.json"),
        projectId: process.env.GOOGLE_PROJECT_ID
      });
      
    const bucket = gc.bucket(process.env.BUCKET_NAME) 
      
	
	const blob = bucket.file(`${uuid()}.${mime.extensions[type][0]}`);

	const stream = blob.createWriteStream({
		resumable: true,
		contentType: type,
		predefinedAcl: 'publicRead',
	});

	
    const {title, description, difficulty, cookingTime, preparationTime, category, ingredients, directions, servings, creator } = req.body
   
    const newRecipe = new Recipe ({
        title,
        description, 
        imageURL : `https://storage.googleapis.com/${bucket.name}/${blob.name}`,
        difficulty,
        cookingTime,
        preparationTime, 
        ratings : {
            averageRating : 0 , 
            ratings : []
        },
        likes : {
          likesNumber: 0,
          likes: []
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

    stream.on('error', err => {
		next(err);
	});

	stream.on('finish', () => {
		res.status(200).json({
			data: {
                url: `https://storage.googleapis.com/${bucket.name}/${blob.name}`,
                recipe : newRecipe
			},
        });
        
    });

    stream.end(req.file.buffer);

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
    
    const isInArray = recipe.ratings.ratings.some(function (rating) {
        return rating.user.equals(userId);
    }); 
    
    try {
        const sess = await mongoose.startSession()
        sess.startTransaction({ session : sess })
        if (!isInArray) {
            recipe.ratings.ratings.push( {user : user, rating : rate} )
            
        }
        else {
            recipe.ratings.ratings.some(function (recipe) { if (recipe.user == userId) { recipe.rating = rate} })
        }
        await recipe.save({ session : sess})
        await sess.commitTransaction()
    } catch (err) {
        console.log(err)
        return next(new httpError('Rating a recipe failed'), 500)
    }
    let total = 0;
   recipe.ratings.ratings.map((recipe) =>{
        total = total + recipe.rating
    } )
    recipe.ratings.averageRating = total / recipe.ratings.ratings.length
    console.log(recipe.ratings.averageRating)
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
    
    const imagePath = recipe.imageURL

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

    fs.unlink(imagePath, err => {
        console.log(err)
    })

    res.json({ message : "Deleted recipe"})
}

//For search by title
function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

exports.getAllRecipes = getAllRecipes
exports.getRecipesByUserId = getRecipesByUserId
exports.getRecipeByRecipeId = getRecipeByRecipeId
exports.getLikedRecipesByUserId = getLikedRecipesByUserId
exports.getPopularRecipes = getPopularRecipes
exports.getTopRatedRecipes = getTopRatedRecipes
exports.getRecipesBySearch = getRecipesBySearch
exports.getRecipesByCategory = getRecipesByCategory
exports.addRecipe = addRecipe
exports.rateRecipe = rateRecipe
exports.toggleLike = toggleLike
exports.updateRecipe = updateRecipe
exports.deleteRecipe = deleteRecipe