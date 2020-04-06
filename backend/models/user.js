const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const Schema = mongoose.Schema;

const userSchema = new Schema({
    
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
   /* profile: {
        type: String,
        required: true
    },*
    resetPasswordLink: {
      data: String,
      default: ''  
    },*/
    recipes : [{
        type : mongoose.Types.ObjectId, 
        require : true, ref : 'Recipe'
    }],
    likes : [{
        type: mongoose.Types.ObjectId,
        ref : 'Recipe'
    }],
    resetPasswordToken: String,// used for after password reset is submitted
	  resetPasswordExpires: Date
    
});

//to check if the email exists already  
userSchema.plugin(uniqueValidator)
module.exports = mongoose.model('User', userSchema);