//Importing the express and body-parser
const express = require('express');
const bodyParser = require('body-parser'); 
const config = require('./config');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');

//Initialize the express app
const app = express();

mongoose.connect('mongodb://localhost/cms-api', {useNewUrlParser: true}, err => {
  if (err) {
    console.log(err);
  } else {
    console.log('Connected to the database');
  }
});

//Body Parser settings
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());
app.use(morgan('dev'));

//Parse the JSON data for validity
app.use((err, req, res, next) => {
    if (err) {
        res.send('Provide valid JSON data!');
    } else {
        next();
    }
});

// Routes
let userRoutes = require('./routes/user.route');
let adminUserRoutes = require('./routes/admin-user.route');
let authorRoutes = require('./routes/author.route');
// Routes of the app
app.use('/user', userRoutes);
app.use('/admin-panel', adminUserRoutes);
app.use('/authors', authorRoutes);


// Server listen on port config.port
app.listen(config.port, () => {
    console.log('Server started and running on the port number ' + config.port)
});
