//Passport authentication
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
//.. means to look into the server folder and then config folder for keys
const keys = require('../config/keys');
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
        new User({googleId: profile.id}).save();
       /* console.log('accessToken', accessToken);
        console.log('refreshToken', refreshToken)
        console.log('profile', profile) */
    }
    )
);