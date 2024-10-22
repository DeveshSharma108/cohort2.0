require('dotenv').config({path:'../.env'})
const express = require('express')
const { validateToDo, validateId } = require('./inputValidate')
const {ToDo} = require('./db/index')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors({
    origin:'http://localhost:5173'
}))

app.post('/todo',async function (req,res){
    const createPayLoad = req.body
    const parsePayLoad = validateToDo.safeParse(createPayLoad)
    //console.log(parsePayLoad)
    //console.log(parsePayLoad.error)
    //console.log(parsePayLoad.error.errors[0].message)
    
    if (!parsePayLoad.success) {
        res.status(411).send("Empty entries not allowed .....")
        return
    }
    
    
    await ToDo.create({
        title:createPayLoad.title,
        description:createPayLoad.description
    })
    res.json({message:"todo created"})
    
})

app.get('/todos',async function (req,res){
    const todos = await ToDo.find({})
    res.json({todos})
})

app.put('/completed',async function (req,res){
    const updatePayLoad = req.body
    const parsePayLoad = validateId.safeParse(updatePayLoad)
    if (!parsePayLoad.success) {
        res.status(411).json({message:"Invalid ToDo id"})
        return
    }
    await ToDo.updateOne({_id:req.body.id},{completed:true})
    res.json({"msg":"marked as completed"})
})

app.listen(3000,()=>{
    console.log("Server started ........")
})