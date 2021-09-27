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
mongoose.connect(keys.mongoURI);

const app = express();

app.use(
    cookieSession({
        //maxAge: how long this cookie can exist in the browser until it expires. 30 days needs to be passed as milliseconds
        maxAge: 30 * 24 * 60 *60 * 1000,
        //encrypting the cookie so that people cant manually change the userID
        keys: [keys.cookieKey] //providing multiple keys
    })
);
//Tell passport that it should make use of cookies to handle authentication
app.use(passport.initialize());
app.use(passport.session());
//ROUTES
//this immediately invokes/calls the authRoutes function that was called in. 
require('./routes/authRoutes')(app);



//localhost:5000
const PORT = process.env.PORT || 5000;
app.listen(PORT);



 
