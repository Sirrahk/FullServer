//Passport authentication
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
//.. means to look into the server folder and then config folder for keys
const keys = require('../config/keys');

const User = mongoose.model('users')

//I want to be able to authenticate users through this strategy
//Before making use of the GoogleStrategy must provide the client id and client secret
passport.use(
    new GoogleStrategy(
    {
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback'
    }, 
    (accessToken, refreshToken, profile, done) => {

        //Initiating a Query to find a users record in the collection
        User.findOne({googleId: profile.id})
        //a promise
            .then((existingUser) => {
                if(existingUser){
                    //We already have a record with the given profile ID
                    //provide two arguments to the done function, done(error argument, user record)
                    done(null, existingUser);
                } else{
                    //We don't have a user record with this ID, make a new record

                     //Calling save(), saves that record, asynchronous operation
                    new User({googleId: profile.id}).save();

                }
            })
       
        //Console.log statements to test if the user information is being grabbed
        /*console.log('accessToken', accessToken);
        console.log('refreshToken', refreshToken)
        console.log('profile', profile) */
    }
    )
);