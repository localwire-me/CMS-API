const mongoose = require('mongoose')//Importing mongose DB
const Schema= mongoose.Schema;

//Define schema
let userSchema=new Schema({
    email_id:{type:String,required:true,max:50},
    password:{type:String,required:true}
})

//Export the model
module.exports=mongoose.model('User',userSchema)