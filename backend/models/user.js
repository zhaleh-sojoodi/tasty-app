
//   const bcrypt = require('bcryptjs') 
// const mongoose = require('mongoose')
// const uniqueValidator = require('mongoose-unique-validator')
// const Schema =new  mongoose.Schema;

// const userSchema = new Schema({
//     name: {
//         type: String,
//         required: true
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     password: {
//         type: String,
//         required: true, 
//         minlength : 6
//     },
//     avatar: {
//         type: String
//     },
//     recipes : {
//         type : mongoose.Types.ObjectId, 
//         require : true, ref : 'Recipe'
//     },
//     favoriteRecipes : {
//         type: mongoose.Types.ObjectId,
//         ref : 'Recipe'
//     }
    
// });
// module.exports = mongoose.model('User', userSchema)


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
  recipes : {
            type : mongoose.Types.ObjectId, 
            require : true, ref : 'Recipe'
         },
        favoriteRecipes : {
             type: mongoose.Types.ObjectId,
             ref : 'Recipe'
         }
 
});

module.exports = User = mongoose.model('user', UserSchema);