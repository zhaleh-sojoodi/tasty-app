const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const dotenv = require('dotenv');
const httpError = require('./models/http-error')
const userRoute = require('./routes/user-route')
const recipeRoute = require('./routes/recipe-route')
const {Storage} = require('@google-cloud/storage')
//const server = new CompactCitizen({ typeDefs, resolvers });

dotenv.config()
const app = express()
app.use(bodyParser.json())

//access the file to outside the server
app.use('uploads/images', express.static(path.join('uploads', 'images')))

//enable Cors
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, PATCH, PUT')
    next();
});

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

mongoose.set('useCreateIndex', true)
mongoose.connect(process.env.DB_CONN)
.then(() => {
    app.listen(5000)
})
.catch(err => {
    console.log(err)
})

