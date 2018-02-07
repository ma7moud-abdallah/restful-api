const express = require('express')
const router = express.Router()

const auth = require('../middeleware/auth')
const Controller = require('../controller/order')

// Get All Orders
router.get('/',auth,Controller.getAllOrders)

// Create New Orer
router.post('/',auth,Controller.createOrder)

// Get Specific Order
router.get('/:id',auth,Controller.getOneOrder)

// Delete Orer
router.delete('/:id',auth,Controller.deleteOrder)


module.exports = router