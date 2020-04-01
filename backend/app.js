const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const httpError = require('./models/http-error')
const userRoute = require('./routes/user-route')
const recipeRoute = require('./routes/recipe-route')

const app = express()
app.use(bodyParser.json())

app.use('/api/user', userRoute)
app.use('api/recipe', recipeRoute)



mongoose.connect('')
.then(() => {
    app.listen(5000)
})
.catch(err => {
    console.log(err)
})
