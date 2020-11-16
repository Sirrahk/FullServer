//Getting our express server running 
const express = require('express');
require('./services/passport');

const app = express();

//this immediately invokes/calls the authRoutes function that was called in. 
require('./routes/authRoutes')(app);


const PORT = process.env.PORT || 5000;
app.listen(PORT);
//localhost:5000
 
