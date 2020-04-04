// const express = require('express')
// const connectDB = require('./config/db')
// const app = express()
//  const bodyParser = require('body-parser')
//  const mongoose = require('mongoose')
//  const httpError = require('./models/http-error')
 //const userRoute = require('./routes/user-route')
 //const recipeRoute = require('./routes/recipe-route')



const express = require('express');
const connectDB = require('./config/db');


const app = express();

// Connect Database
connectDB();
app.get('/', (req, res) => res.send('API Running'))

// Init Middleware
app.use(express.json({extended : false}));

// Define Routes
app.use('/api/user', require('./routes/user-route'))
  app.use('/api/recipe', require('./routes/recipe-route'))
  app.use('/api/auth', require('./routes/auth'));
  

  const PORT = process.env.PORT || 5000
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`))