const express = require('express')
const router = express.Router()
const multer = require('multer')

const auth = require('../middeleware/auth')

// Accepting Files
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './upload')
      },
      filename: function (req, file, cb) {
        cb(null, file.originalname )
      }
    })
const upload = multer({storage: storage})

const Controller = require('../controller/product')


// Get All Products
router.get('/',Controller.getAllProducts)

// Create New Products
router.post('/',auth, upload.single('productImage'), Controller.createProduct)

// Get Specific Product
router.get('/:id',Controller.getOneProduct)

// Delete prouct
router.delete('/:id',auth,Controller.deleteProduct)

// Update Product
router.patch('/:id',auth,Controller.updateProduct)


module.exports = router