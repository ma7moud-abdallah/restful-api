const mongoose = require('mongoose')

const Order =  require('../models/orders')
const Product = require('../models/products')

//Handling Get Requests for Get All Orders

exports.getAllOrders = (req,res,next) =>{
    Order.find()
    .select('_id quantity product')
    .exec()
    .then(result =>{
         const response = {
             count:result.length,
             orders:result.map(order => {
                 return{
                    id:order._id,
                    product:order.product,
                    quantity:order.quantity,
                     request:{
                         type:'GET',
                         url:'localhost:3000/orders/'+ order._id
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

//Handling Post Requests for Create New Order
 exports.createOrder = (req,res,next) =>{
    Product.findById(req.body.productid)
    .then(product => {
        if(!product){
            res.status(500).json({
                message:"product not found"
            })
        }
    })
        const order = new Order({
            _id: mongoose.Types.ObjectId(),
            quantity: req.body.quantity,
            product: req.body.productid
        })
        order.save()
        .then(result => {
            res.status(201).json({
                message :" order created successfully",
                "order" : result,
                request:{
                    type:'GET',
                    url:'localhost:3000/orders'
                }
            })
           
        })
        .catch(err =>{
            res.status(201).json({
                message :" some thing went wrong ",
                'error':err
        })
    })
   
}

//Handling Get Requests for Get Specific Order
exports.getOneOrder = (req,res,next) =>{
    const id = req.params.id
    Order.findById(id)
    .populate('product','_id title price')
    .select('_id product quantity')
    .exec()
    .then(result => {
        if (!result) {
            return res.status(404).json({
              message: "Order not found"
            });
          }
        res.status(200).json({
           order:result,
            request:{
                type:'GET',
                url:'localhost:3000/orders'
            } 
        })
    })
    .catch(err => {
         res.status(404).json(err)
    })
} 
//Handling  Requests for Delete  Order
exports.deleteOrder = (req,res,next) =>{
    const id = req.params.id
    Order.remove({_id:id})
    .exec()
    .then(result =>{
         res.status(200).json({message:'order successfully deleted'})
     })
     .catch( err=> {
        res.status(200).json({
            message:'some thing went wrong',
            'error':err
        
        })
     })
}