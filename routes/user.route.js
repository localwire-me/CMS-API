let express =require('express');
let router=express.Router();//Expreess Router

//Import the user Controller
let userController=require('../controllers/user.controller');

//Create the routes
router.get('/test',userController.test);//To test thr route 


//Export the router
module.exports=router;
