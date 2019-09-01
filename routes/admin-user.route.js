let express = require('express');
const checkJWT = require('../middlewares/check-jwt');
let router = express.Router();// Express Router

// Import the user Controller
let userController = require('../controllers/admin-user.controller');

// Create the routes
router.get('/test',userController.test); //To test the route 

router.post('/admin-signup_localwire123', userController.signup);
router.post('/admin-login_localwire123', userController.login);
router.delete('/:id', checkJWT, userController.delete);
router.get('/get-all-users', checkJWT, userController.getAllAdminUsers);

// Export the router
module.exports = router;
