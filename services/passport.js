//Passport authentication
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
//.. means to look into the server folder and then config folder for keys
const keys = require('../config/keys');
const User = mongoose.model('users')

//for cookie setup pro
passport.serializeUser((user, done) =>{
//To uniquely idenify the user we are making use the of identifier that is in our mongoddb because users can sign in from various sources, so not everyone will have a googleid but everyone has a user id.
//user is a mongoose model instance
    done(null, user.id);
});

//Taking the id previously stuffed into the cookie and turning it back into a user model.

passport.deserializeUser((id, done) => {
    User.findById(id)
    .then(user => {
        done(null, user);
    });
});
//I want to be able to authenticate users through this strategy
//Before making use of the GoogleStrategy must provide the client id and client secret
passport.use(
    new GoogleStrategy(
    {
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback'
    }, 
//This is the checking if a user profile exists and if not creating a user
    (accessToken, refreshToken, profile, done) => {

        //Initiating a Query to find a users record in the collection
        User.findOne({googleId: profile.id}).then((existingUser) => {
                if(existingUser) {
                    //Checking if we already have a record with the given profile ID
                    //provide two arguments to the done function, done(error argument, user record)
                    done(null, existingUser);
                    //if we have it, that means no error and the record is the existingUser in our mongodb
                } else{
                    //We don't have a user record with this ID, make a new record

                     //Calling save(), saves that record, asynchronous operation
                    
                    new User({googleId: profile.id}).save()
                        .then(user => done(null, user));
                        //Once the new record is saved then the done function can be triggered
                    }
                })
       
                console.log('accessToken', accessToken);
                console.log('refreshToken', refreshToken);
                console.log('profile', profile);     }
        )
    );
       
        //Console.log statements to test if the user information is being grabbed
        /**/
