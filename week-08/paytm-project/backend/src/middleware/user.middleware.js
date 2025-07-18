// JWT tokens will not be the same every time, even if the input (payload and secret) is the same.

/*
 Why JWT Tokens Are Different for the Same Input?
The iat (Issued At) Claim Changes Every Time

By default, jwt.sign() includes an iat (issued at) timestamp in the token.
Since this timestamp is different for each request, the generated token will be different.
If expiresIn is Used, the Expiration (exp) Claim Changes

If you set an expiration (e.g., "1h"), the token will contain a different exp (expiration) value each time.
This makes the token unique even with the same payload.
Different Signing Algorithms May Introduce Variations

If you're using different signing algorithms (e.g., HS256, RS256), it can change the token structure.
*/

import jwt from 'jsonwebtoken'

const authMiddleware = async (req,res,next)=>{

    console.log('Inside auth middlewar')
    const secret = process.env.JWT_SECRET
    const token = req.header("Authorization")?.replace("Bearer ","")
    /*
    The ?. operator in JavaScript is called the optional chaining operator. It is used to safely access deeply nested object properties without causing errors if any intermediate property is null or undefined.
    */

    if (!token) {
        return res.status(401).json({ message: "Access Denied: No token provided" });
    }   
    try {
        const decodedToken = jwt.verify(token,secret)
        // console.log(decodedToken)
        // attaching userId to req
        req.body.userId = decodedToken.userId
        next()
    } catch (error) {
        return res.status(401).json({ message: "Invalid or expired token" });
    
    }
}

export default authMiddleware;