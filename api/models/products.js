const mongoose = require('mongoose')

const proSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    title:{type:String,required:true},
    price:{type:Number,required:true},
    productImage:{type:String}
})

module.exports = mongoose.model('Product', proSchema)
