//To add to gitignore file so this does not get uploaded to github
//keys.js- figure out what set of credetials to return, whether we are in a production or dev environment
if (process.env.NODE_ENV === 'production'){
    //we are in production - return production set of keys4
    module.exports = require('./prod')
} else{
    //we are in development- return the development set of keys
    module.exports = require('./dev');
}