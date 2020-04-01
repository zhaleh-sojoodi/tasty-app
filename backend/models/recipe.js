// const mongoose = require('mongoose');
// const recipeSchema = new mongoose.Schema({
//     title: {
//        type: String,
//        required: true
//     },
//     userId: {
//         type: mongoose.Schema.ObjectId,
//         ref: 'User'
//     },
//     image: {
//         type: String,
//         required: true
//     },
//     servings: {
//         required: true,
//         type: Number
//     },
//     description: {
//         required: true,
//         type: String,
//         minlength: 1,
//         maxlength: 200
//     },
//     directions: {
//         required: true,
//         type: [String]
//     },
//     ingredients: {
//         required: true,
//         type: [String]
//     },
//     date: {
//         type: Date,
//         default: Date.now
//     }
    
// })
// module.exports = Recipe = mongoose.model('Recipe', RecipeSchema);