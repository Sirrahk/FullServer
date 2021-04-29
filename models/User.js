//Creating our Mongoose model class
const mongoose = require('mongoose');

//const Schema = mongoose.Schema;
//ES2015 destructuring(condensing this top line)
const { Schema } = mongoose;

//Creating a schema object which is an object for All the properties that the users will have. We can easily add in additional properties 
const userSchema = new Schema({
    googleId: String
});

//Creating a model class and letting mongoose know that we want to create a new collection called users. 

mongoose.model('users', userSchema);