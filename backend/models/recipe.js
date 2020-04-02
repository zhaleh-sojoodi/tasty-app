const mongoose = require('mongoose')
const Schema = mongoose.Schema

const recipeSchema = new Schema({
    title : {
        type : String , 
        required : true
    }, 
    description : {type : String }, 
    imageURL : {type : String }, 
    difficulty : {
        type : Number , 
        required : true
    }, 
    cookingTime : {
        type : Number , 
        required : true
    },
    preparationTime : {
        type : Number , 
        required : true
    }, 
    ratings : {
        rating : [{type : Number}], 
        averageRating : {type : Number}
    }, 
    likedNumber : {type : Number},
    category : {
        type :String, 
        required: true
    }, 
    ingredients : [{
        type : String, 
        required : true
    }], 
    servings : {type : Number},
    addedDate : {
        type : Date, 
        default: Date.now, 
        required: true
    },
    creator : {
        type : mongoose.Types.ObjectId, 
        require : true, ref : 'User'
    }
})

module.exports = mongoose.model('Recipe', recipeSchema);
