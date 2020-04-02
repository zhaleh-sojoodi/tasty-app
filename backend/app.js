const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
var dotenv = require('dotenv');
const httpError = require('./models/http-error')
const userRoute = require('./routes/user-route')
const recipeRoute = require('./routes/recipe-route')


const app = express()
app.use(bodyParser.json())

app.use('/api/user', userRoute)
app.use('/api/recipe', recipeRoute)

//handle 404 error
app.use((req,res,next) => {
    const error = new httpError('Could not find the route' , 404);
    return next(error);
})

app.use((error,req,res,next) => {
    if(res.headerSent) {
        return next(error)
    }
    res.status(error.code||500) 
    res.json({message:error.message || 'An unknown message occured'})
});


mongoose.connect(`mongodb+srv://jaleh36:Jalehs@cluster0-vkvjv.mongodb.net/recipeApp?retryWrites=true&w=majority`)
.then(() => {
    app.listen(5000)
})
.catch(err => {
    console.log(err)
})


