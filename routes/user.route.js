let express = require('express');
let router = express.Router();// Express Router

// Import the user Controller
let userController = require('../controllers/user.controller');

// Create the routes
router.get('/test',userController.test); //To test the route 

router.post('/signup', userController.signup);

// Export the router
module.exports = router;
