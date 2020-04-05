const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        trim: true,
        required: true,
        max: 32,
        unique: true,
        index: true,
        lowercase: true
    },
    name: {
        type: String,
        trim: true,
        required: true,
        unique : true,
       
       
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true, 
        minlength : 6
    },
    profile: {
        type: String,
        required: true
    },
    resetPasswordLink: {
      data: String,
      default: ''  
    },
    recipes : [{
        type : mongoose.Types.ObjectId, 
        require : true, ref : 'Recipe'
    }],
    likes : [{
        type: mongoose.Types.ObjectId,
        ref : 'Recipe'
    }]
    
}, {timestamp: true});

//to check if the email exists already  
userSchema.plugin(uniqueValidator)
module.exports = mongoose.model('User', userSchema);