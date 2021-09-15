//Getting our express server running 
const express = require('express');
//Requiring in mongoose
const mongoose = require('mongoose'); 
//Need to tell passport to keep track of our user sessions by using cookies
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');

//whenever our app first boots up all te user collection info will load and be created

//Mongoose connect method
mongoose.connect(keys.mongoURI,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
});

const app = express();
//ROUTES
//this immediately invokes/calls the authRoutes function that was called in. 
require('./routes/authRoutes')(app);



//localhost:5000
const PORT = process.env.PORT || 5000;
app.listen(PORT);



 
