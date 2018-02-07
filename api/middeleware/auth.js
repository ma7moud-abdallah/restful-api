const jwt = require('jsonwebtoken')
const config = ('../../config/database')

// Authenticate Routes
module.exports = (req, res, next) => {
    try{
    const token = req.headers.authorization.split(" ")[1]
    const decoded = jwt.verify(token,config.secret)
    next()
    }
    catch(err){
        return res.status(401).json({
            message:"Auth failed",
            error:err
        })
    }
} 