/*
const nums = [4,5,2,9,0]
const i = Math.random()
console.log(i)
console.log(i*5)
console.log(Math.floor(i*5))
console.log(nums[Math.floor(i*5)])


// if we want to generate number between 12 and 40

const a = Math.random()
console.log(a+12)             // generate random numbers between 12 to 13 (13 not included)
console.log(Math.floor(a*(40-12)))   // generate random numbers between 0 to 18 (18 not included)
console.log(Math.floor(a*(40-12))+12)  // generate random numbers in range [12,40) 
// if we want to include 40 as well just add 1 at last
console.log((Math.floor(a*(40-12))+12)+1)
*/



const express = require('express')
const cors = require('cors')
const app = express()
// app.use(cors)  // incorrect syntax
app.use(cors())
const todos = [[
        { id: 0, title: "Buy groceries", description: "Milk, Bread, Banana" },
        { id: 1, title: "Walk the dog", description: "Take Bruno to the park" },
        { id: 2, title: "Complete project", description: "Finish coding task manager" },
        { id: 3, title: "Read a book", description: "Start reading 'Atomic Habits'" },
        { id: 4, title: "Exercise", description: "Do 30 minutes of strength training" }
    ],
    [
        { id: 0, title: "Buy groceries", description: "Milk, Bread, Banana, Apple" },
        { id: 1, title: "Walk the dog", description: "Take Bruno to the park" },
        { id: 2, title: "Complete project", description: "Finish coding task manager" },
        { id: 3, title: "Read a book", description: "Start reading 'Think Like A Monk'" },
        { id: 4, title: "Exercise", description: "Do 30 minutes of strength training" }
    ],
    [
        { id: 2, title: "Complete project", description: "Finish coding task manager" },
        { id: 3, title: "Read a book", description: "Start reading 'Atomic Habits'" },
        { id: 4, title: "Exercise", description: "Do 30 minutes of strength training" }
    ],
    [
        { id: 0, title: "Buy groceries", description: "Milk, Bread, Honey" },
        { id: 2, title: "Complete project", description: "Finish coding task manager" },
        { id: 3, title: "Read a book", description: "Start reading 'Atomic Habits'" },
        { id: 4, title: "Exercise", description: "Do 30 minutes of strength training" },
        { id: 5, title: "Speak", description: "Talk to gpt in english" },

    ]]
let i = Math.floor(Math.random()*4)
console.log('hi')
app.get('/todos',function(req,res){
    res.status(200).json({"todos":todos[i]})
})
setInterval(() => {
    i = Math.floor(Math.random()*4)
}, 1000);
app.listen(3000,()=>console.log('server started ......'))