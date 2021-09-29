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
    User.findById(id).then(user => {
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
        callbackURL: '/auth/google/callback',
        proxy: true,
    }, 
//This is the checking if a user profile exists and if not creating a user
    async (accessToken, refreshToken, profile, done) => {

        //Initiating a Query to find a users record in the collection
       const existingUser =   await User.findOne({googleId: profile.id})
            if(existingUser) {
                    //Checking if we already have a cord with the given profile ID
                return done(null, existingUser);
                    //if we have it, that means no error(null) and the record is the existingUser in our mongodb
                } 
                //If there is no user record with this ID, make a new record
 
                const user = await new User({googleId: profile.id}).save()
                        done(null, user);
                         //Calling save(), saves that record, Once the new record is saved then the done function can be triggered
                })
     );

       
        
