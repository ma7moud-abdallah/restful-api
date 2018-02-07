const express = require('express')
const bodyparser = require('body-parser')
const mongoose = require('mongoose')
const config = require('./config/database')

const prouctroute = require('./api/routes/products')
const orderroute = require('./api/routes/orders')
const userroute = require('./api/routes/user')

mongoose.connect(config.database)
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));



const app = express()

app.use('/upload',express.static('upload'))
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())

app.use((req,res,next)=>{
    res.header('Access-Controll-Allow-Origin','*')
    res.header('Access-Controll-Allow-Headers','*')
    if(req.method === 'OPTIONS'){
     res.header('Access-Controll-Allow-Methods','POST,PUT,PATCH,DELETE')
    }
    next()
})

app.use('/products', prouctroute)
app.use('/orders', orderroute)
app.use('/user', userroute)

app.use((req,res,next) => {
    const error = new error('Not Found')
    error.status = 404
    next(error)
   
})

app.use((error,req,res,next) => {
    
    res.status(error.status || 500)
    res.json({
        'message':error.message
    })
   
})


module.exports = app