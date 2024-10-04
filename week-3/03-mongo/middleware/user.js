const {User} = require('../db/index') 
async function userMiddleware(req, res, next) {
    const username = req.headers.username
    const password = req.headers.password

    // if user is not found null is returned
    const user = await User.findOne({username,password})
    if(!user){
        res.status(401).json({ message: 'Unauthorized: User not found' })
    }else{
        next()
    }
    
}

module.exports = userMiddleware;