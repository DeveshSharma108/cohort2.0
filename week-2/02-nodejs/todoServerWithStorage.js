// hard todo --> todo server with persistance storage
// we will use the file todo.json for storage


const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs')

app.use(express.json());
const port = 3000;

// console.log(process.cwd()) used to get the location from where the script/js file is executed
  // to get all todos
app.get('/todos',function(req,res){
    fs.readFile('/home/devesh/Desktop/assignments-master/week-2/02-nodejs/todos.json','utf8',(err,data)=>{
        if (err){
            //console.log(err)
            res.status(500).send("Unable to read the file please try again later")
        }else{
            //console.log(data)
            res.status(200).send(data)
        }
    })
})

// to get a specific todo we can use find() function instead of forEach()
app.get('/todos/:id',function(req,res){
    const id = req.params.id
    fs.readFile('/home/devesh/Desktop/assignments-master/week-2/02-nodejs/todos.json','utf8',(err,data)=>{
        if (err){
            console.log(err)
            res.status(500).send("Unable to read the file please try again later")
        }else{
            let responseTodo = JSON.parse(data).find((todo)=>todo.id === id)
            if (responseTodo){
                res.status(200).send(responseTodo)
            }else{
                res.status(404).send("Invalid Id!")
            }
        }
    })
})

// adding new todo in todos with a unique id
const {v4:uuidv4} = require('uuid');
const { type } = require('os');
app.post('/todos', (req, res) => {
    // first we have to read the file and append the new todo at last of the todo array and then write the updated array again in file because fs.write overwrites the data of the file in this case fs.append is also not useful for us

    fs.readFile('/home/devesh/Desktop/assignments-master/week-2/02-nodejs/todos.json','utf8',(err,data)=>{
        if (err){
            console.log(err)
            res.status(500).send("Unable to read the file please try again later")
        }else{
            let todo = req.body
            todo['id'] = uuidv4()
            // we can not write an object directly into the file we have to first stringify it see what happens if you do not do it 
            // the above comment was written earlier it is still valid but we have changed approach a little bit 

            // data.push(todo) giving error  ???

            //let todosArr = data
            //console.log(data)    
            //console.log(todosArr)
            // fs.readfile return string beacuse utf-8 was specified else it will return buffer object then data will be of type object  at first I thought data is array type and tried to push the new todo into into and got an error we need to parse it
            //console.log(typeof data)  
            //console.log(typeof todosArr)

            data = JSON.parse(data)   // now we can use push method
            // console.log(typeof data)  // return object
            data.push(todo)
            //console.log(data)
            // again we need to stringify the data for writing into the file
            fs.writeFile('/home/devesh/Desktop/assignments-master/week-2/02-nodejs/todos.json',JSON.stringify(data),(err,data)=>{
            if (err){
                console.log(err)
                res.status(500).send("Unable to save the todo please try again later")
            }else{
                res.status(201).send({id:todo.id})
            }
            })
            // console.log(typeof todo)
        }
    })
    
});

// updating a todo if it exist using id
app.put('/todos/:id',function(req,res){
    const id = req.params.id
    fs.readFile('/home/devesh/Desktop/assignments-master/week-2/02-nodejs/todos.json','utf8',(err,data)=>{
        if (err){
            console.log(err)
            res.status(500).send("Unable to read the file please try again later")
        }else{
            let todos = JSON.parse(data)
            let index = todos.findIndex((todo)=>todo.id === id)
            if (index !== -1){
                todos[index] = {...todos[index],...req.body} // spread operator
                fs.writeFile('/home/devesh/Desktop/assignments-master/week-2/02-nodejs/todos.json',JSON.stringify(todos),(err,data)=>{
                    if (err){
                        console.log(err)
                        res.status(500).send("Unable to save the todo please try again later")
                    }else{
                        res.status(200).send('ToDo updated')
                    }
                    })
            }else{
                res.status(400).send("Invalid Id!")
            }
        }
    })

})


// deleting a todo if it exist using id
app.delete('/todos/:id', function (req, res) {
    const id = req.params.id
    fs.readFile('/home/devesh/Desktop/assignments-master/week-2/02-nodejs/todos.json', 'utf8', (err, data) => {
        if (err) {
            console.log(err)
            res.status(500).send("Unable to read the file please try again later")
        } else {
            let todos = JSON.parse(data)
            let existingToDo = todos.find((todo) => todo.id === id)
            if (existingToDo) {
                todos.splice(todos.indexOf(existingToDo), 1)
                fs.writeFile('/home/devesh/Desktop/assignments-master/week-2/02-nodejs/todos.json', JSON.stringify(todos), (err, data) => {
                    if (err) {
                        console.log(err)
                        res.status(500).send("Unable to save the todo please try again later")
                    } else {
                        res.status(200).send('deleted the ToDo')
                    }
                })
            } else {
                res.status(400).send("Invalid Id!")
            }
        }
    })

})
  
// middleware to catch any invalid url that is not part of the above urls
app.use((req,res)=>{
    res.status(404).send("Page Not Found")
})


if (require.main === module) {
  app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
  });
}

module.exports = app;