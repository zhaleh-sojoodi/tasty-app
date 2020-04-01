const recipeSchema = new Schema({
    title : {type : String , required : true}, 
    description : {type : String, required : true }, 
    imageURL : {type : String , required : true}, 
    difficulty : {type : Number , required : true}, 
    cookingTime : {type : Number , required : true},
    preparationTime : {type : Number , required : true}, 
    avarageRating : {type : Number , required : true}, 
    likedNumber : {type : Number, required : true},
    category : {type :String, required: true}, 
    ingredients : [{type : String, required : true}], 
    creator : {type : mongoose.Types.ObjectId, require : true, ref : 'User'}
})

module.exports = mangoose.Schema('Recipe', recipeSchema)
