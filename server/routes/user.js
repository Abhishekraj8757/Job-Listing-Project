const express = require('express');
const userRouter = express.Router();
const userModel = require('../models/users');
const bcrypt = require('bcrypt');
const generateAuthToken = require('../middlewares/generateAuthToken');

userRouter.post('/register',async (req,res,next) => {
   let {name,email,mobile,password} = req.body;
  
   if(!name || !email || !mobile || !password){
     return next({
        status : 400,
        message : 'Missing credentials for registering a user!'
     });
   }

   const userExists = await userModel.findOne({email : email},{email : 1}) ? true : false;
  
   if(userExists){
     return next({
        status : 400,
        message : 'User already registered!'
     });
   }


   const hashedPassword = await bcrypt.hash(password,10);
   const newUser = new userModel({
     name,
     email,
     password : hashedPassword,
     mobileNumber : mobile
   });

   let jwtToken;

   await newUser.save();
   
   jwtToken = await generateAuthToken(name,email)
              
   return res.status(201).json({
     statusCode : 201,
     message : 'User Registered!',
     jwtToken
   })

})

userRouter.post('/login',async (req,res,next) => {
   let {email,password} = req.body;
   if(!email || !password){
     return next({
        status : 400,
        message : 'email or password not present!'
     })
   }

   let userExists = await userModel.findOne({email : email},{email : 1,name : 1});
   console.log(userExists);
   if(!userExists){
     return next({
        status : 400,
        message : 'User not present!'
     })
   }

   let jwtToken = await generateAuthToken(userExists?.email,userExists?.name);
   res.status(200).json({
     status : 200,
     message : 'User successfully logged in',
     jwtToken
   })


})

module.exports = userRouter;