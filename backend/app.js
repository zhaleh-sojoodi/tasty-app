const fs = require('fs')
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

//google clouds
const gc = new Storage({
    keyFilename: path.join(__dirname, './compact-citizen-273600-1bca00eb71ea.json'),
    projectId: 'compact-citizen-273600'
})
const RecipeFilesBucket = gc.bucket('recipe-files')
//print bucket info in console
gc.getBuckets().then(x => console.log(x))

const resolvers = {
    Query: {
      files: () => files
    },
    Mutation: {
      uploadFile: async (_, { file }) => {
        const { createReadStream, filename } = await file;
  
        await new Promise(res =>
          createReadStream()
            .pipe(
              coolFilesBucket.file(filename).createWriteStream({
                resumable: false,
                gzip: true
              })
            )
            .on("finish", res)
        );
  
        files.push(filename);
  
        return true;
      }
    }
  };

//return the file 
app.use('uploads/images', express.static(path.join('uploads', 'images')))

//enable Cors
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, PATCH')
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
    if (req.file) {
        fs.unlink (req.file.path, err => {
            console.log(err)
        })
    }
    if(res.headerSent) {
        return next(error)
    }
    res.status(error.code||500) 
    res.json({message:error.message || 'An unknown message occured'})
});

mongoose.set('useCreateIndex', true)
mongoose.connect(process.env.DB_CONN , {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    app.listen(5000)
})
.catch(err => {
    console.log(err)
})
