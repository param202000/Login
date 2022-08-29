const express = require('express')
const app = express()
const cors = require('cors');
const db = require('./dbConnection')
const { User } = require('./UserModel');
const mongoose = require('mongoose');

app.use(cors())
app.use(express.json())
const userData=mongoose.model('User');

app.post("/register", function (req, res) {
    var usData=new userData({
        username:req.body.username,
        password:req.body.password,
        
    });
  
    usData.save().then((docs)=>{
        return res.status(200).json({
            success:true,
            message:'New Data recorded',
            data:docs
        })
    })
    .catch((err)=>{
        return res.status(401).json({
            success:false,
            message:'Error in adding data',
            error:err.message
        })
    })
})

//Showing login form
app.post("/login", function (req, res) {
   const usData = userData.find({$where:{username:req.body.username ,password:req.body.password}})
   if(usData){
    return res.status(200).json({
        success:true,
        message:'login sucessfully',        
    })
   }
   else{
   
        return res.status(401).json({
            success:false,
            message:'Error in login',
           
        })
   
   }
})
   
var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log("Server Has Started!");
});
module.exports = app