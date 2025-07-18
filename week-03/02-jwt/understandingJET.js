const jwt = require('jsonwebtoken');
const jwtPassword = 'secret';
username = "Devesh"
a = jwt.sign({token:username},jwtPassword)
console.log(a)
console.log(jwt.decode(jwt.sign({username},jwtPassword)))

function verifyJwt(token) {
    
    jwt.verify(token,'secret',function(err,decoded){
        if(err){
            console.log(false)
        }else{
            console.log(decoded)
        }
    })
}
verifyJwt(a)

console.log(jwt.decode('dsahsdfkjhaskfhaksjfhkajhf'))