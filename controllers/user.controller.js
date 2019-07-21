let User= require('../models/user.model');//Import the user model
//Test route 
exports.test = function(req,res){
  res.send("This is test route!");
}