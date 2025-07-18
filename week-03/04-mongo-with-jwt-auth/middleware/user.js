function userMiddleware(req, res, next) {

    const jwt = require('jsonwebtoken')
    const secret = process.env.JWT_SECRET
    const token = req.header("Authorization")?.replace("Bearer ","")

    try {
        const decodedToken = jwt.verify(token,secret)
        req.username = decodedToken.username
        next()
    } catch (error) {
        res.status(403).send("Unauthorized request")
    }
}

module.exports = userMiddleware;