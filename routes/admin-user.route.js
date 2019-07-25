let express = require('express');
let router = express.Router();// Express Router
const jwt = require('jsonwebtoken');
const User = require('../models/user.model'); 

// Import the user Controller
let adminUserController = require('../controllers/admin-user.controller');

router.post('/admin-signup_localwire123', adminUserController.signup);
router.post('/admin-login_localwire123', adminUserController.login);

// Export the router
module.exports = router;
