//Getting our express server running 
const express = require('express');
const app = express();

//Telling how to handle http requests
app.get('/', (req, res) => {
    res.send({hi: 'there'});
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);
//localhost:5000