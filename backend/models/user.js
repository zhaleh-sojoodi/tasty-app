const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const Schema = mongoose.Schema;

const userSchema = new Schema({
<<<<<<< HEAD
    
    name: {
        type: String,
        trim: true,
        required: true,
        unique : true,
       
       
=======
    name: {
        type: String,
        required: true
>>>>>>> 43e44e39a7963bb3c6cd1ed8bcf574b2ab7f837e
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
<<<<<<< HEAD
   /* profile: {
        type: String,
        required: true
    },*
    resetPasswordLink: {
      data: String,
      default: ''  
    },*/
=======
    biography: {
        type: String
    },
>>>>>>> 43e44e39a7963bb3c6cd1ed8bcf574b2ab7f837e
    recipes : [{
        type : mongoose.Types.ObjectId, 
        require : true, ref : 'Recipe'
    }],
    likes : [{
        type: mongoose.Types.ObjectId,
        ref : 'Recipe'
<<<<<<< HEAD
    }],
    resetPasswordToken: String,// used for after password reset is submitted
	  resetPasswordExpires: Date
=======
    }]
>>>>>>> 43e44e39a7963bb3c6cd1ed8bcf574b2ab7f837e
    
});

//to check if the email exists already  
userSchema.plugin(uniqueValidator)
module.exports = mongoose.model('User', userSchema);