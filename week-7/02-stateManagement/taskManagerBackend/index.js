import express from 'express'
import taskRouter from './routes/tasks.js'
import cors from 'cors'
const app = express()

app.use(cors({origin:'http://localhost:5173'}))
// for parsing the incoming json body we will need json middleware
app.use(express.json())
app.use('/tasks',taskRouter)
app.listen(3000,()=>{console.log("Running....")})