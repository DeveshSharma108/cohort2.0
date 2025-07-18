/*

// While operatins like transactions atomicity is crucial because, if we update the sender's and receiver's balance separately without a transaction, a failure in the second step (e.g., server crash, network issue) will lead to data inconsistency—money gets deducted but not added.

// Simulating the server crash in middle of the operation 

const user1 = {"id":"123","balance":1000}
const user2 = {"id":"456","balance":700}
const user3 = {"id":"789","balance":500}
const users = [user1,user2,user3]
// const a = user1
// a.balance = 300
// console.log(user1)

console.log("...................Without atomicity.....................")

console.log("Before transaction")
console.log(`Sender - User 1 ; Balance:${user1.balance}`)
console.log(`Receiver - User 2 ; Balance:${user2.balance} \n`)

const failTransfer = function(senderId,receiverId,amount){
    try {
        // deducting money from sender 
        users.filter((user)=>user.id == senderId).map((user)=>user.balance -= amount)

        // server crash
        throw new Error("Server Crashed!!")


        // adding money to receiver
        users.filter((user)=>user.id == receiverId).map((user)=>user.balance += amount)
        console.log("Money transfered successfuly !")
        
    } catch (error) {
        console.error(error.message)
        console.log()
    }
}

failTransfer('123','456',100)

console.log("After failed transaction")
console.log(`Sender - User 1 ; Balance:${user1.balance}`)
console.log(`Receiver - User 2 ; Balance:${user2.balance} \n`)


// resetting balance
user1.balance = 1000
console.log("...................With atomicity.....................")
console.log("Before transaction")
console.log(`Sender - User 1 ; Balance:${user1.balance}`)
console.log(`Receiver - User 2 ; Balance:${user2.balance} \n`)

const atomicTransfer = function(senderId,receiverId,amount){
    // const backup = users  // fails why ?
    // In JavaScript, objects and arrays are stored by reference, not by value  When you do const backup = users;, both backup and users point to the same memory location.So, when you modify users, backup also changes, making rollback ineffective
    
    
    const backup = JSON.parse(JSON.stringify(users))
    console.log(backup)
    Above approach will also not work because Even though JSON.parse(JSON.stringify(users)) creates a deep copy, it creates new object instances. This means that objects in backup are not the same instances as user1 and user2, so rolling back by restoring users doesn't actually restore the original user1 and user2.
    

    // Correct approach creating deepcopy of users array storing refrences of the original user objects 
    
    // console.log((1,2,3))  -> ?
    // return (1,2,3)

    const backup = new Map(users.map((user)=>[user.id,{...user}]))
    // console.log(backup)
    
    Map is a built-in JavaScript object that stores key-value pairs where:
    
    Keys can be of any type (objects, numbers, functions, etc.).
    Unlike objects ({}), Map preserves key order.
    Offers better performance for frequent additions/removals.
    
    
    try {
        // deducting money from sender 
        users.filter((user)=>user.id == senderId).map((user)=>user.balance -= amount)

        // server crash
        throw new Error("Server Crashed!!")


        // adding money to receiver
        users.filter((user)=>user.id == receiverId).map((user)=>user.balance += amount)
        console.log("Money transfered successfuly !")
        
    } catch (error) {
        console.error(error.message)
        console.log()
        
        users.length = 0 //🤯
        users.push(...backup)
        

        // updating original user objects 
        users.forEach((user)=>{
            if (backup.has(user.id)){
                Object.assign(user,backup.get(user.id))
            }
        })
    }
}
atomicTransfer('123','456',100)
console.log("After failed transaction")
console.log(`Sender - User 1 ; Balance:${user1.balance}`)
console.log(`Receiver - User 2 ; Balance:${user2.balance} \n`)
// console.log(user1)
// console.log(users[0])

*/



import { Account } from '../models/accounts.model.js'
import mongoose, { mongo } from 'mongoose'
const moneyTransferService = async(req,res) => {
    const session = await mongoose.startSession()
    session.startTransaction()
    try {
        console.log(req.body)
        const senderId = req.body.userId
        console.log(typeof(senderId))
        const receiverId = req.body.to
        const amount = Number(req.body.amount)
        console.log(senderId,'\n',receiverId,'\n',amount)

        /*
        
        we can convert a string to mongo db objectId type by using 
        new mongoose.Types.ObjectId()  
        this code is also correct
        */
        const receiverAccount = await Account.findOne({userId:receiverId}).session(session)

        const senderAccount = await Account.findOne({userId:senderId}).session(session)
        
        /*
        // here string worked fine but above approach is more suitable 
        const receiverAccount = await Account.findOne({userId:receiverId}).session(session)
        // console.log('receiver',receiverAccount)
        const senderAccount = await Account.findOne({userId:senderId}).session(session)
        // console.log('sender',senderAccount)
        */
        
        if (!receiverAccount){
            await session.abortTransaction()
            return res.status(400).json({
                message: "Invalid receiver account"
            });
        }
    
        if (amount > senderAccount.balance) {
            await session.abortTransaction()
            return res.status(400).json({
                message: "Insufficient balance.."
            });
        }

        if (amount <= 0 ) {
            await session.abortTransaction()
            return res.status(400).json({
                message: "Enter Valid Amount!"
            });
        }
    
        await Account.updateOne({userId:senderId},{
            $inc:{
                balance:-amount
            }
        }).session(session)
        await Account.updateOne({userId:receiverId},{
            $inc:{
                balance:amount
            }
        }).session(session)
    
        await session.commitTransaction()
        session.endSession()
        res.status(200).json({
            message:"Transfer Successful!"
        })
    } catch (error) {
        console.log(error)
        await session.abortTransaction()
        await session.endSession()
        res.status(500).json({message:"Internal Server Error !"})
    }
}

export default moneyTransferService