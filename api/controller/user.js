const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const  jwt = require('jsonwebtoken')

const User = require('../models/user')

// Add New User
exports.userSignup = (req,res,next) => {
    User.find({email:req.body.email})
    .exec()
    .then(user =>{
        if(user.length){
            res.status(409).json({
                message:"this email is existed"
            })
        }else{
            bcrypt.hash(req.body.password, 10, function(err, hash) {
                if(err){
                    return res.status(500).json({
                       message:'some thing went wrong',
                       error:err
                    })
                }else{
                    const user = new User({
                        _id: mongoose.Types.ObjectId(),
                        email:req.body.email,
                        password:hash
                    })
                    user.save()
                    .then(result =>{
                        console.log(result)
                        res.status(201).json({
                            message:'User Created Succesfully'
                        })
                       
                    })
                    .catch(err =>{
                        res.status(404).json({error:err})
                        })
                }
              });
        }
    })
   
}
// User Login
exports.userLogin = (req,res,next) => {
    User.find({email:req.body.email})
    .exec()
    .then(user => {
        if(!user.length){
            return res.status(401).json({
                message:"Auth failed"
            })
        }
        
        bcrypt.compare(req.body.password, user[0].password, function(err, result) {
           if(err){
            return res.status(401).json({
                message:"Auth failed"
            })
           }if(result){
               const token = jwt.sign({
                 email:user[0].email,
                 password:user[0]._id
               },
               "secret",
               {
                 expiresIn:"2 days"
               }
            )
               return res.status(201).json({
                   message:"user logged in",
                   token:token

               })
           }
            res.status(401).json({
            message:"Auth failed"
        })

        });
    })
    .catch(err => {
         res.status(401).json({
             message:"Auth failed",
             error:err
         })
    })
}
  //Delete User
exports.deleteUser = (req,res,next) => {
    User.remove({id:req.params.userid})
    .exec()
    .then(result =>{
        res.status(200).json({
            message:"user successfully deleted"
        })
    })
    .catch(err => {
       res.status(500).json({
           message:"some thing went wrong",
           error:err
       })
    })
}