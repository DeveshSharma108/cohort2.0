// Middleware for handling auth
function adminMiddleware(req, res, next) {
    // Two ways to access HTTP headers in Express:
    // 1. req.headers: Access all headers as an object (dot or bracket notation).
    // 2. req.header(): Use this method to retrieve a specific header by name (case-insensitive).
    // Example: req.headers['authorization'] or req.header('Authorization')

    const jwt = require('jsonwebtoken')
    const secret = process.env.JWT_SECRET
    const token = req.header("Authorization")?.replace("Bearer ","")
    // jwt.verify() throws an error if the token is invalid
    // jwt is sync function by default but we can make it async by passing a callback function as third arguement

    try {
        const decodedToken = jwt.verify(token,secret)
        // adding username to the request so that it can be used by next middleware
        req.username = decodedToken.username
        next()
    } catch (error) {
        res.status(403).send("Unauthorized request")
    }

}

module.exports = adminMiddleware;