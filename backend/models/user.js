const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const Schema = mongoose.Schema;

const userSchema = new Schema({
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
        required: true, 
        minlength : 6
    },
    biography: {
        type: String
    },
    imageURL : String , 
    recipes : [{
        type : mongoose.Types.ObjectId, 
        require : true, ref : 'Recipe'
    }],
    likes : [{
        type: mongoose.Types.ObjectId,
        ref : 'Recipe'
    }]
    
});

//to check if the email exists already  
userSchema.plugin(uniqueValidator)
module.exports = mongoose.model('User', userSchema);