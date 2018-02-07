const mongoose = require('mongoose')

const Product = require('../models/products')

//Handling Get Requests for Get All Products
exports.getAllProducts = (req,res,next) =>{
    Product.find()
    .select('title price _id productImage')
    .exec()
    .then(result =>{
         const response = {
             count:result.length,
             products:result.map(product => {
                 return{
                    name:product.title,
                    price:product.price,
                    productImage:product.productImage,
                     request:{
                         type:'GET',
                         url:'localhost:3000/products/'+ product._id
                     }
                 }
             })
         }
         res.status(200).json(response)
      })
    .catch(err =>{
     res.status(404).json({error:err})
     }) 
 }

//Handling Post Requests for Create New Product
 exports.createProduct = (req,res,next) =>{
    const product = new Product({
        _id:mongoose.Types.ObjectId(),
        title:req.body.title,
        price:req.body.price,
        productImage:req.file.path
    })
    product.save()
    .then(result =>{
         res.status(201).json({
           'message':'product created successfuly',
           "product":{
               name:result.title,
               price:result.price,
               id:result._id,
               request:{
                   type:'GET',
                   url:'localhost:3000/products/'+ result._id
               }
           }
   
       }) 
         
    })
    .catch(err => console.log(err)) 
 }

 //Handling Get Requests for Get Specific Product
 exports.getOneProduct = (req,res,next) =>{
    const id = req.params.id
    Product.findById(id)
    .select('title price _id productImage')
    .exec()
    .then(result => {
      if(!result) {
          return  res.status(404).json({
                  message:"this product is not found"
                })
        }
      res.status(200).json({
           product:result,
            request:{
                type:'GET',
                url:'localhost:3000/products'
            } 
        })
    })
    .catch(err => {
         res.status(404).json(err)
    })
}

// Hanling Delete Product
 exports.deleteProduct = (req,res,next) =>{
    const id = req.params.id
    Product.remove({_id:id})
    .exec()
    .then(result =>{
         res.status(200).json({message:'product successfully deleted'})
     })
     .catch( err=> {
        res.status(200).json({
                message:'some thing went wrong',
                'error':err
            })
     })
 }

 //Handling Patch Requests for Update Product
 exports.updateProduct = (req,res,next) =>{
    const id = req.params.id
    const updatepro ={}
    for(const prop of req.body){
        updatepro[prop.propname] = prop.value
    }
    Product.update({_id:id},{$set:updatepro})
    .exec()
    .then(result =>{
        res.status(200).json({
            'message':'product successfully updated',
            request:{
                type:'GET',
                url:'localhost:3000/products/'+ id
            } 
        })
    })
    .catch( err=> {
        res.status(200).json({message:'some thing went wrong'})
     })
   
  
}