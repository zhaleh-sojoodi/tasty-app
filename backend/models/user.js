const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    
    date: {
        type: Date,
        default: Date.now
    },
    userRecipes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recipe'
      }],
      favRecipes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recipe'
        //one more component thats a form add favorite, sent user and recipe id
      }]
});
module.exports =  mongoose.model('User', userSchema);