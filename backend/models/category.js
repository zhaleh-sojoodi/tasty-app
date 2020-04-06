const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
  name: { type: String,
     required: true, 
     unique: true }

  
})

Category.create([
  {
    'name': 'Breakfast'
  }, {
    'name': 'Lunch'
  }, {
    'name': 'Dinner'
  },{
    'name': 'Sides'
  },
  {
    'name': 'Drinks'
  },
  {'name': 'Dessert'}
  
])


module.exports = mongoose.model('Category', categorySchema)