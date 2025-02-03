import dotenv from "dotenv"
dotenv.config(
    {path:'../.env'}
)
import {app} from './app.js'
import connectDB from './db/index.js'

console.log(process.env.JWT_SECRET)


connectDB().then((data)=>{
    try {
        app.listen(3000,()=>console.log('running'))
        // console.log(app._router.stack); //??
        console.log('DB connected ..... DB host',data)
    } catch (error) {
        console.log('error in app')
        console.log(error)
    }
}).
catch((error)=>{
    console.log("Error while connecting to the MongoDB database")
    console.log(error)
})

