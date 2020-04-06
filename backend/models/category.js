const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
  Breakfast:
   { type: String,
     required: true
      },

     Brunch:
      { type: String,
      required: true, 
     },

      Lunch: 
      { type: String,
        required: true, 
        },

        Dinner: 
        { type: String,
          required: true, 
         },

          Dessert: 
        { 
          type: String,
          required: true, 
         },
          
          Drinks: 
        { type: String,
          required: true, 
       },
       Sides:{
         type: String
       }

  
})
 
// const Category = Category.create([
//   {
//     'name': 'Breakfast'
//   }, {
//     'name': 'Lunch'
//   }, {
//     'name': 'Dinner'
//   },{
//     'name': 'Sides'
//   },
//   {
//     'name': 'Drinks'
//   },
//   {'name': 'Dessert'}
  
// ])


module.exports = mongoose.model('Category', categorySchema)