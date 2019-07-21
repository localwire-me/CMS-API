//Importing the express and body-parser
const express =require('express');
const bodyParser=require('body-parser'); 
const mongoose=require('mongoose');
const config=require('./config');
const cors = require('cors');

//Initialize the express app
const app=express();

//Body Parser settings
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors())

//Parse the JSON data for validity
app.use((err, req, res, next) => {
    if (err) {
        res.send('Provide valid JSON data!')
    }else {
       next()
    }
});

//Routes
let user=require('./routes/user.route');
//Routes of the app
app.use('/user',user);
app.get('*', function(req, res) {
    res.render('error');
});

//Server listen on port config.port
app.listen(config.port,()=>{
console.log('Server started and running on the port number '+config.port)
});