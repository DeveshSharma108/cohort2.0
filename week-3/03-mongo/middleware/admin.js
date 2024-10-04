// Middleware for handling auth
// will have to make middleware async
const {Admin} = require('../db/index') 
async function adminMiddleware(req, res, next) {
    const username = req.headers.username
    const password = req.headers.password

    // if admin is not found null is returned
    const admin = await Admin.findOne({username,password})
    if(!admin){
        res.status(401).json({ message: 'Unauthorized: Admin not found' })
    }else{
        next()
    }
    
}

module.exports = adminMiddleware;