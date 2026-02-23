const jwt = require('jsonwebtoken')

function authMiddileware(req,res,next){
    const token = req.cookies?.token || req.headers.authorization?.split(" ")[1]
    if(!token){
        return res.status(400).json({
            message : "no token"
        })
    }
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
    req.user= decoded
    next()
    } catch (error) {
        return res.status(400).json({
            message : "invalid token"
        })
    }
    
}
module.exports = authMiddileware